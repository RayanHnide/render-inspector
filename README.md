# Rayan Render Inspector

[![npm version](https://img.shields.io/npm/v/@rayan_hn/render-inspector.svg)](https://www.npmjs.com/package/@rayan_hn/render-inspector)
[![npm downloads](https://img.shields.io/npm/dw/@rayan_hn/render-inspector.svg)](https://www.npmjs.com/package/@rayan_hn/render-inspector)
[![license](https://img.shields.io/npm/l/@rayan_hn/render-inspector.svg)](./LICENSE)

React performance debugging tools for finding unnecessary rerenders, slow commits, and expensive calculations in minutes.

`@rayan_hn/render-inspector` is built for React and Next.js developers who want practical dev-time visibility with almost zero setup. By default, logs stay disabled in production.

## Install

```bash
npm install @rayan_hn/render-inspector
```

## Why Use It

- Understand why components rerender and which props changed
- Track rerender counts and highlight noisy components
- Measure render commit time and expensive memoized tasks
- Keep function identity stable with `useStableCallback`
- Share config app-wide with `PerformanceProvider`

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

## License

MIT © 2026 Rayan Hnide
