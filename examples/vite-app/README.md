# Vite Example Snippet

Use `ProductList.tsx` as a drop-in component to test rerender and task diagnostics in a Vite React app.

## Usage

```tsx
import { PerformanceProvider } from "@rayan_hn/render-inspector";
import { ProductList } from "./ProductList";

const products = [
  { id: 1, name: "Basic Tee", category: "clothes" },
  { id: 2, name: "Wireless Mouse", category: "electronics" }
];

export function App() {
  return (
    <PerformanceProvider slowRenderThreshold={12}>
      <ProductList products={products} />
    </PerformanceProvider>
  );
}
```
