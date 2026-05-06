# Rayan Render Inspector

[![npm version](https://img.shields.io/npm/v/@rayan_hn/render-inspector.svg)](https://www.npmjs.com/package/@rayan_hn/render-inspector)
[![npm downloads](https://img.shields.io/npm/dw/@rayan_hn/render-inspector.svg)](https://www.npmjs.com/package/@rayan_hn/render-inspector)
[![license](https://img.shields.io/npm/l/@rayan_hn/render-inspector.svg)](./LICENSE)
[![CI](https://github.com/RayanHnide/render-inspector/actions/workflows/ci.yml/badge.svg)](https://github.com/RayanHnide/render-inspector/actions/workflows/ci.yml)
[![Publish](https://github.com/RayanHnide/render-inspector/actions/workflows/publish.yml/badge.svg)](https://github.com/RayanHnide/render-inspector/actions/workflows/publish.yml)
[![CodeQL](https://github.com/RayanHnide/render-inspector/actions/workflows/codeql.yml/badge.svg)](https://github.com/RayanHnide/render-inspector/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/RayanHnide/render-inspector/badge)](https://securityscorecards.dev/viewer/?uri=github.com/RayanHnide/render-inspector)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@rayan_hn/render-inspector)](https://bundlephobia.com/package/@rayan_hn/render-inspector)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Detect unnecessary React rerenders in minutes, not hours.

`@rayan_hn/render-inspector` gives React and Next.js teams fast answers to three expensive questions:

- Why did this component rerender?
- Which subtree is rerendering too often?
- Which render/compute path is actually slow?

It is dev-first and production-safe by default (`includeInProduction: false`).

## Install

```bash
npm install @rayan_hn/render-inspector
```

## 20-Second Outcome Demo

```tsx
useRenderCount("CheckoutPanel", { warnAfter: 6 });
useWhyDidYouRender("CheckoutPanel", props, { deep: true });
useRenderTime("CheckoutPanel", { threshold: 12 });
```

```txt
[CheckoutPanel] rerendered because 1 props changed
changed: onSubmit (function identity)
[CheckoutPanel] render commit took 18.24ms
```

## Quality and Security

- CI runs typecheck, tests, and build on every PR and push to `main`
- Code scanning is enabled via CodeQL workflow
- Daily dependency checks are enabled with Dependabot
- OpenSSF Scorecard is available as an independent project health signal
- Semantic releases run on every `main` push to auto-version, tag, publish to npm, and create GitHub releases

## Why Use It

- Understand why components rerender and which props changed
- Track rerender counts and highlight noisy components
- Measure render commit time and expensive memoized tasks
- Keep function identity stable with `useStableCallback`
- Share config app-wide with `PerformanceProvider`

## Use Cases You Can Copy Today

- Next.js dashboard input lag: `docs/recipes/nextjs-dashboard-input-lag.md`
- Product list rerender storms: `docs/recipes/product-list-rerender-storm.md`
- Expensive memoized computations: `docs/recipes/expensive-memo-debugging.md`

## Comparison

### vs React DevTools Profiler

- Profiler is great for deep session analysis
- Render Inspector is better for always-on in-code signals while building features

### vs `why-did-you-render`

- `why-did-you-render` focuses on rerender reasons
- Render Inspector additionally tracks render counts, render commit timings, and expensive memoized tasks in one package

## 60-Second Quick Start

```tsx
"use client";

import { useRenderCount, useRenderTime, useWhyDidYouRender } from "@rayan_hn/render-inspector";

export function ProductCard(props: { name: string; price: number; filter: string }) {
  useRenderCount("ProductCard", { warnAfter: 8 });
  useWhyDidYouRender("ProductCard", props, { deep: true, ignoreKeys: ["filter"] });
  useRenderTime("ProductCard", { threshold: 10 });

  return <div>{props.name} - ${props.price}</div>;
}
```

Example console output:

```txt
[ProductCard] rendered 6 times
[ProductCard] rerendered because 2 props changed
[ProductCard] render commit took 19.52ms
```

## Works With

- React 18+
- Next.js (App Router + Client Components)
- Vite React apps
- TypeScript and JavaScript

## Copy/Paste Examples

### 1) Catch prop churn with `useWhyDidYouRender`

```tsx
useWhyDidYouRender("UserCard", props, {
  deep: true,
  ignoreKeys: ["updatedAt", "lastSeenAt"]
});
```

### 2) Guard unstable UI trees with `RenderGuard`

```tsx
import { RenderGuard } from "@rayan_hn/render-inspector";

<RenderGuard name="Sidebar" limit={6}>
  <Sidebar />
</RenderGuard>;
```

### 3) Track expensive list work with `useExpensiveTask`

```tsx
const visibleProducts = useExpensiveTask(
  "filter-products",
  () => products.filter(matchesFilters),
  [products, matchesFilters],
  { threshold: 8 }
);
```

## Next.js App Router Setup

Use `PerformanceProvider` in `app/layout.tsx` to share defaults:

```tsx
import type { ReactNode } from "react";
import { PerformanceProvider } from "@rayan_hn/render-inspector";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PerformanceProvider slowRenderThreshold={12}>{children}</PerformanceProvider>
      </body>
    </html>
  );
}
```

## API

### `useRenderCount(name, options?)`
Returns the current render count and logs each render based on options.

```tsx
const count = useRenderCount("DashboardTable", {
  warnAfter: 10,
  logEvery: 1
});
```

### `useWhyDidYouRender(name, props, options?)`
Diffs previous and current props and logs what changed.

```tsx
useWhyDidYouRender("UserCard", props, {
  deep: true,
  ignoreKeys: ["updatedAt"],
  logOnMount: false
});
```

### `useRenderTime(name, options?)`
Measures render-to-commit duration and warns when threshold is exceeded.

```tsx
useRenderTime("AnalyticsPanel", {
  threshold: 16,
  logEveryRender: false
});
```

### `RenderGuard`
Simple wrapper around `useRenderCount` for subtree guardrails.

```tsx
<RenderGuard name="CheckoutPanel" limit={5}>
  <CheckoutPanel />
</RenderGuard>
```

### `useStableCallback(callback)`
Keeps callback identity stable while always invoking the latest callback body.

### `useDeepCompareMemo(factory, deps)`
Memoizes value when dependencies are deeply equal (useful for object-shaped deps).

### `useExpensiveTask(name, task, deps, options?)`
Measures expensive computed work inside `useMemo` and warns over threshold.

### `usePerformanceMark(name)`
Manually time custom event-handler workflows.

```tsx
const mark = usePerformanceMark("Checkout");

function onCheckout() {
  mark("calculate totals", () => {
    calculateTotals(cart);
  });
}
```

## Production Safety

The library is dev-first:

- `includeInProduction` defaults to `false`
- hooks are effectively no-op in production unless explicitly enabled
- provider-level config controls behavior globally

```tsx
<PerformanceProvider
  enabled={process.env.NODE_ENV === "development"}
  includeInProduction={false}
  slowRenderThreshold={16}
>
  <App />
</PerformanceProvider>
```

## FAQ

### Does this affect production performance?
No by default. Logging and checks are disabled in production unless you opt in with `includeInProduction`.

### Is this a replacement for React DevTools Profiler?
No. It complements Profiler by giving in-code, component-level signals while you build.

### Can I use this in Next.js App Router?
Yes. Add the provider in layout and use hooks in client components.

## Examples

See `examples/next-app` for ready-to-use snippets.

## Growth + Marketing Assets

To help increase adoption, this repo includes:

- `docs/GROWTH_PLAN.md` - a 30-day distribution plan
- `docs/SOCIAL_POSTS.md` - ready-to-publish social content
- `docs/RELEASE_TEMPLATE.md` - weekly release checklist and changelog template

## Open Source Workflow

For contributors and maintainers:

- `CONTRIBUTING.md` - setup and contribution process
- `CODE_OF_CONDUCT.md` - community behavior expectations
- `SECURITY.md` - private vulnerability reporting
- `ROADMAP.md` - upcoming priorities
- `CHANGELOG.md` - release history and highlights

## License

MIT © 2026 Rayan Hnide
