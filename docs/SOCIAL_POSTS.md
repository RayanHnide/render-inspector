# Ready-to-Publish Social Posts

Use these as templates for X, LinkedIn, Dev.to, and community channels.

Replace placeholders:

- `<NPM_URL>` => https://www.npmjs.com/package/@rayan_hn/render-inspector
- `<GITHUB_URL>` => https://github.com/RayanHnide/render-inspector

## Post 1: Launch Message

Built a tiny React debugging package to answer 3 questions fast:
- Why did this rerender?
- How often is it rerendering?
- Which render/task is slow?

Package: `@rayan_hn/render-inspector`

```tsx
useRenderCount("ProductCard");
useWhyDidYouRender("ProductCard", props);
useRenderTime("ProductCard", { threshold: 10 });
```

Install: `<NPM_URL>`
Source: `<GITHUB_URL>`

## Post 2: Prop Churn

If your React UI "feels" slow, check prop churn first.

```tsx
useWhyDidYouRender("UserCard", props, {
  deep: true,
  ignoreKeys: ["updatedAt"]
});
```

This reveals noisy prop updates fast.

`@rayan_hn/render-inspector`
`npm i @rayan_hn/render-inspector`

## Post 3: Next.js App Router

Next.js App Router perf debugging setup in 20 seconds:

```tsx
<PerformanceProvider slowRenderThreshold={12}>
  {children}
</PerformanceProvider>
```

Then add hooks in client components:

```tsx
useRenderCount("ProductCard");
useRenderTime("ProductCard");
```

Package: `<NPM_URL>`

## Post 4: Expensive Work

Renders are not always the issue. Sometimes memoized work is the bottleneck.

```tsx
const visibleProducts = useExpensiveTask(
  "filter-products",
  () => products.filter(matchesFilters),
  [products, matchesFilters],
  { threshold: 8 }
);
```

Catch expensive tasks directly in component code.
`@rayan_hn/render-inspector`

## Post 5: Render Guard

Guard noisy component trees with one wrapper:

```tsx
<RenderGuard name="Sidebar" limit={6}>
  <Sidebar />
</RenderGuard>
```

Simple signal for rerender storms during development.

Install: `npm i @rayan_hn/render-inspector`

## Post 6: Stable Callbacks

If callback identity keeps changing, memoization breaks.

```tsx
const onSubmit = useStableCallback((value: string) => {
  save(value);
});
```

Same function identity, latest logic.

From: `@rayan_hn/render-inspector`

## Post 7: 3-Minute Perf Audit

3-minute React perf audit flow:

1) `useRenderCount` on suspect components
2) `useWhyDidYouRender` for changed props
3) `useRenderTime` for slow commits

No heavy setup. Works in Next.js + React.

`npm i @rayan_hn/render-inspector`

## Post 8: Dev-Only Safety

I wanted perf diagnostics without shipping noise to production.

`@rayan_hn/render-inspector` defaults to dev-safe behavior.

```tsx
<PerformanceProvider includeInProduction={false}>
  <App />
</PerformanceProvider>
```

Package: `<NPM_URL>`

## Post 9: Before/After

Before:
- Component rerendered too often
- No clear reason why

After:
- `useWhyDidYouRender` showed exactly which props changed
- Memoized unstable values
- Rerenders dropped immediately

Tool used: `@rayan_hn/render-inspector`

## Post 10: Release Note Template

Shipped `@rayan_hn/render-inspector@<VERSION>`:
- <feature 1>
- <feature 2>
- <docs/example update>

Goal: faster React + Next.js perf debugging in everyday workflows.

Install: `npm i @rayan_hn/render-inspector`
Source: `<GITHUB_URL>`
