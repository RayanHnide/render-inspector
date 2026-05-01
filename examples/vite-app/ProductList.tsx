"use client";

import { useMemo, useState } from "react";
import {
  RenderGuard,
  useExpensiveTask,
  useRenderCount,
  useRenderTime,
  useWhyDidYouRender
} from "@rayan_hn/render-inspector";

type Product = {
  id: number;
  name: string;
  category: string;
};

export function ProductList({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filters = useMemo(() => ({ query, category }), [query, category]);

  useRenderCount("ProductList", { warnAfter: 10 });
  useWhyDidYouRender("ProductList", { products, filters });
  useRenderTime("ProductList", { threshold: 12 });

  const visibleProducts = useExpensiveTask(
    "filter-products",
    () =>
      products.filter((item) => {
        const matchQuery = item.name.toLowerCase().includes(query.toLowerCase());
        const matchCategory = category === "all" || item.category === category;
        return matchQuery && matchCategory;
      }),
    [products, query, category],
    { threshold: 8 }
  );

  return (
    <RenderGuard name="ProductList subtree" limit={12}>
      <div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search product..."
        />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">All</option>
          <option value="clothes">Clothes</option>
          <option value="electronics">Electronics</option>
        </select>

        <ul>
          {visibleProducts.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </RenderGuard>
  );
}
