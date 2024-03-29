import { CardItem } from "@/components";
import { ProductType } from "@/shared";
import React from "react";

export const ProductList = ({ products }: { products: ProductType[] }) => {
  return (
    <>
      {products.map((product) => (
        <CardItem key={product.productId} {...{ product }} />
      ))}
    </>
  );
};
