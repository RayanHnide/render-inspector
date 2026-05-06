# Recipe: Stop Product List Rerender Storms

## Problem

A product list rerenders the full tree when filters change, causing stutter and noisy React updates.

## Quick instrumentation

```tsx
import { RenderGuard, useWhyDidYouRender } from "@rayan_hn/render-inspector";

function ProductList(props: ProductListProps) {
  useWhyDidYouRender("ProductList", props, {
    deep: true,
    ignoreKeys: ["lastFetchedAt"]
  });

  return (
    <RenderGuard name="ProductListTree" limit={6}>
      <Grid products={props.products} />
    </RenderGuard>
  );
}
```

## Common root causes

- New array/object references from parent each render
- Inline callbacks recreated in maps
- Derived filters recomputed for unchanged inputs

## Stabilize references

```tsx
const onAddToCart = useStableCallback((id: string) => {
  addToCart(id);
});

const visibleProducts = useDeepCompareMemo(
  () => applyFilters(products, activeFilters),
  [products, activeFilters]
);
```

## Expected outcome

- Rerender count warnings drop quickly
- Large list interactions feel more responsive
- Clear visibility into exactly which props caused updates
