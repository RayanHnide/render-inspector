"use client";

import {
  useRenderCount,
  useRenderTime,
  useStableCallback,
  useWhyDidYouRender
} from "@rayan_hn/render-inspector";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  onAddToCart: (id: string) => void;
};

export function ProductCard(props: ProductCardProps) {
  useRenderCount("ProductCard", { warnAfter: 8 });
  useWhyDidYouRender("ProductCard", props);
  useRenderTime("ProductCard", { threshold: 8 });

  const handleAddToCart = useStableCallback(() => {
    props.onAddToCart(props.id);
  });

  return (
    <article>
      <h2>{props.name}</h2>
      <p>${props.price}</p>
      <button type="button" onClick={handleAddToCart}>
        Add to cart
      </button>
    </article>
  );
}
