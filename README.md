# Rayan Render Inspector

React performance inspection tools by **Rayan Hnedi**.

`@rayan_hn/render-inspector` helps React and Next.js developers understand why components rerender, how often they rerender, and which UI work is becoming expensive.

It is designed for development debugging first. By default, logs are disabled in production builds.

## Install

```bash
npm install @rayan_hn/render-inspector
```

## Quick Start

```tsx
"use client";

import {
  useRenderCount,
  useRenderTime,
  useWhyDidYouRender
} from "@rayan_hn/render-inspector";

export function ProductCard(props) {
  useRenderCount("ProductCard");
  useWhyDidYouRender("ProductCard", props);
  useRenderTime("ProductCard");

  return <div>{props.name}</div>;
}
```

Console output can show:

```txt
[ProductCard] rendered 3 times
[ProductCard] rerendered because 1 prop changed
[ProductCard] render commit took 18.42ms
```

## Next.js App Router Setup

Use the provider in `app/layout.tsx` if you want shared config:

```tsx
import type { ReactNode } from "react";
import { PerformanceProvider } from "@rayan_hn/render-inspector";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PerformanceProvider slowRenderThreshold={12}>
          {children}
        </PerformanceProvider>
      </body>
    </html>
  );
}
```

## API

### `useRenderCount(name, options?)`

Counts how many times a component rendered.

```tsx
useRenderCount("DashboardTable", {
  warnAfter: 10,
  logEvery: 1
});
```

### `useWhyDidYouRender(name, props, options?)`

Compares previous props with current props and logs the keys that changed.

```tsx
useWhyDidYouRender("UserCard", props, {
  deep: true,
  ignoreKeys: ["updatedAt"]
});
```

When `deep` is enabled, equal objects with new references are reported as `reference` changes. That is useful for finding props that should be memoized.

### `useRenderTime(name, options?)`

Measures render-to-commit time and warns when the threshold is exceeded.

```tsx
useRenderTime("AnalyticsPanel", {
  threshold: 16,
  logEveryRender: false
});
```

### `RenderGuard`

Warns when a wrapped area renders more than a limit.

```tsx
import { RenderGuard } from "@rayan_hn/render-inspector";

<RenderGuard name="Sidebar" limit={5}>
  <Sidebar />
</RenderGuard>
```

### `useStableCallback(callback)`

Returns a stable function identity that always calls the latest callback.

```tsx
const handleSubmit = useStableCallback((value: string) => {
  save(value);
});
```

### `useDeepCompareMemo(factory, deps)`

Memoizes a value using deep dependency comparison.

```tsx
const filters = useDeepCompareMemo(
  () => ({ status, sort }),
  [{ status, sort }]
);
```

### `useExpensiveTask(name, task, deps, options?)`

Runs a memoized task and reports if it takes too long.

```tsx
const visibleProducts = useExpensiveTask(
  "filter-products",
  () => products.filter(matchesFilters),
  [products, matchesFilters],
  { threshold: 10 }
);
```

### `usePerformanceMark(name)`

Creates a manual measurement helper for event handlers and custom logic.

```tsx
const mark = usePerformanceMark("Checkout");

function onClick() {
  mark("calculate totals", () => {
    calculateTotals(cart);
  });
}
```

## Provider Config

```tsx
<PerformanceProvider
  enabled={process.env.NODE_ENV === "development"}
  includeInProduction={false}
  slowRenderThreshold={16}
  logger={(level, message, meta) => {
    console[level](message, meta);
  }}
>
  <App />
</PerformanceProvider>
```

## Publishing

Before publishing:

```bash
npm install
npm run typecheck
npm run test
npm run build
npm run pack:check
```

Publish the first public version:

```bash
npm login
npm publish --access public
```

For future versions:

```bash
npm version patch
npm publish --access public
```

## License

MIT © 2026 Rayan Hnedi
