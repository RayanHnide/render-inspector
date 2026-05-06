# Recipe: Fix Input Lag in a Next.js Dashboard

## Problem

Typing in a dashboard search box feels delayed because each keystroke rerenders expensive tables and filters.

## Signals to look for

- Search input rerenders parent layout
- Table rows rerender on every keypress
- Filter computation runs repeatedly with the same effective inputs

## Setup

```tsx
import {
  useRenderCount,
  useRenderTime,
  useWhyDidYouRender,
  useExpensiveTask
} from "@rayan_hn/render-inspector";
```

## Instrument the slow path

```tsx
function DashboardTable(props: TableProps) {
  useRenderCount("DashboardTable", { warnAfter: 10 });
  useWhyDidYouRender("DashboardTable", props, { deep: true });
  useRenderTime("DashboardTable", { threshold: 12 });

  const rows = useExpensiveTask(
    "table-filter",
    () => filterRows(props.rows, props.query),
    [props.rows, props.query],
    { threshold: 8 }
  );

  return <Table rows={rows} />;
}
```

## Typical output

```txt
[DashboardTable] rerendered because 1 props changed
changed: onRowClick (function identity)
[DashboardTable] render commit took 24.33ms
[table-filter] expensive task took 11.02ms
```

## Fix checklist

1. Wrap unstable callbacks with `useStableCallback`
2. Move expensive filtering behind `useMemo` or server filtering
3. Keep parent props stable (`memo` where appropriate)
4. Ignore noisy keys that are expected to change (`ignoreKeys`)

## Expected outcome

- Smoother typing in input fields
- Reduced table rerenders
- Fewer slow render warnings in development
