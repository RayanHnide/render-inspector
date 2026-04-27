import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import React, { memo, useState } from "react";
import { act, render, renderHook } from "@testing-library/react";
import {
  PerformanceProvider,
  RenderGuard,
  deepEqual,
  diffProps,
  useDeepCompareMemo,
  useExpensiveTask,
  useRenderCount,
  useStableCallback,
  useWhyDidYouRender
} from "../src";
import type { InspectorLogger } from "../src";

const dom = new JSDOM("<!doctype html><html><body></body></html>");
globalThis.window = dom.window as unknown as Window & typeof globalThis;
globalThis.document = dom.window.document;
Object.defineProperty(globalThis, "navigator", {
  configurable: true,
  value: dom.window.navigator
});
globalThis.HTMLElement = dom.window.HTMLElement;

type Test = {
  name: string;
  run: () => void | Promise<void>;
};

const tests: Test[] = [];

function test(name: string, run: Test["run"]) {
  tests.push({ name, run });
}

function createLogger() {
  const entries: Array<{ level: string; message: string; meta?: Record<string, unknown> }> = [];
  const logger: InspectorLogger = (level, message, meta) => {
    entries.push({ level, message, meta });
  };

  return { entries, logger };
}

test("diffProps detects added, removed, and changed props", () => {
  const changes = diffProps(
    { name: "Rayan", oldValue: true, count: 1 },
    { name: "Rayan", count: 2, newValue: "yes" }
  );

  assert.deepEqual(changes, [
    { key: "oldValue", type: "removed", previous: true, current: undefined },
    { key: "count", type: "changed", previous: 1, current: 2 },
    { key: "newValue", type: "added", previous: undefined, current: "yes" }
  ]);
});

test("diffProps marks reference changes when deep values are equal", () => {
  const changes = diffProps({ filters: { status: "active" } }, { filters: { status: "active" } }, { deep: true });

  assert.equal(changes.length, 1);
  assert.equal(changes[0]?.type, "reference");
});

test("diffProps ignores configured keys", () => {
  const changes = diffProps({ updatedAt: 1, count: 1 }, { updatedAt: 2, count: 2 }, { ignoreKeys: ["updatedAt"] });

  assert.deepEqual(changes, [{ key: "count", type: "changed", previous: 1, current: 2 }]);
});

test("deepEqual compares arrays and objects deeply", () => {
  assert.equal(deepEqual([{ a: 1 }], [{ a: 1 }]), true);
  assert.equal(deepEqual([{ a: 1 }], [{ a: 2 }]), false);
});

test("useRenderCount returns an increasing count", () => {
  const { logger } = createLogger();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <PerformanceProvider logger={logger}>{children}</PerformanceProvider>
  );

  const { result, rerender } = renderHook(() => useRenderCount("Counter", { logOnMount: false }), { wrapper });

  assert.equal(result.current, 1);
  rerender();
  assert.equal(result.current, 2);
});

test("useWhyDidYouRender logs prop changes", () => {
  const { entries, logger } = createLogger();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <PerformanceProvider logger={logger}>{children}</PerformanceProvider>
  );

  const { rerender } = renderHook(({ value }) => useWhyDidYouRender("Card", { value }), {
    initialProps: { value: 1 },
    wrapper
  });

  rerender({ value: 2 });

  assert.equal(entries.some((entry) => entry.message.includes("[Card] rerendered because 1 prop changed")), true);
});

test("useStableCallback keeps identity stable and calls the latest callback", () => {
  const calls: string[] = [];
  const first = () => {
    calls.push("first");
    return "first";
  };
  const second = () => {
    calls.push("second");
    return "second";
  };

  const { result, rerender } = renderHook(({ callback }) => useStableCallback(callback), {
    initialProps: { callback: first }
  });

  const stable = result.current;
  assert.equal(stable(), "first");

  rerender({ callback: second });

  assert.equal(result.current, stable);
  assert.equal(result.current(), "second");
  assert.deepEqual(calls, ["first", "second"]);
});

test("useDeepCompareMemo memoizes with deep dependency comparison", () => {
  let calls = 0;
  const factory = () => {
    calls += 1;
    return { total: 1 };
  };

  const { result, rerender } = renderHook(({ deps }) => useDeepCompareMemo(factory, deps), {
    initialProps: { deps: [{ filter: "active" }] as unknown[] }
  });

  const first = result.current;
  rerender({ deps: [{ filter: "active" }] });

  assert.equal(result.current, first);
  assert.equal(calls, 1);
});

test("useExpensiveTask measures expensive tasks", () => {
  const measures: number[] = [];
  const { result } = renderHook(() =>
    useExpensiveTask("sum", () => [1, 2, 3].reduce((total, item) => total + item, 0), [], {
      onMeasure: (duration) => measures.push(duration)
    })
  );

  assert.equal(result.current, 6);
  assert.equal(measures.length, 1);
});

test("RenderGuard warns after the render limit", () => {
  const { entries, logger } = createLogger();

  function Inner() {
    const [count, setCount] = useState(0);

    return (
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        {count}
      </button>
    );
  }

  const StableInner = memo(Inner);

  const view = render(
    <PerformanceProvider logger={logger}>
      <RenderGuard name="Guarded" limit={1}>
        <StableInner />
      </RenderGuard>
    </PerformanceProvider>
  );

  act(() => {
    view.rerender(
      <PerformanceProvider logger={logger}>
        <RenderGuard name="Guarded" limit={1}>
          <StableInner />
        </RenderGuard>
      </PerformanceProvider>
    );
  });

  assert.equal(
    entries.some((entry) => entry.level === "warn" && entry.message.includes("above the warnAfter limit")),
    true
  );
});

let failed = 0;

for (const item of tests) {
  try {
    await item.run();
    console.log(`ok - ${item.name}`);
  } catch (error) {
    failed += 1;
    console.error(`not ok - ${item.name}`);
    console.error(error);
  }
}

if (failed > 0) {
  process.exitCode = 1;
} else {
  console.log(`\n${tests.length} tests passed`);
}
