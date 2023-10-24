"use client";

import { ProductList } from "@/components";
import { ProductType, searchProductsService, useShopStore } from "@/shared";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function SearchPage(props: {
  params: {
    search: string;
  };
  searchParams: Record<string, string>;
}) {
  const {
    searchParams,
    params: { search },
  } = props;
  const { shopName } = useShopStore();
  const [products, setProducts] = useState<ProductType[]>([]);

  // const { shopName, setDisclosure, handleSetShop } = useShopStore();

  const handlerGetProducts = async (shop: string) => {
    if (shop) {
      const products = await searchProductsService(shop, searchParams);
      setProducts(products);
    }
  };

  useEffect(() => {
    if (shopName) {
      handlerGetProducts(shopName);
    }
  }, [shopName]);

  if (!products.length) {
    return <p>PAGE NOT FOUND</p>;
  }

  return (
    <section className={`w-full m-auto ${styles.container}`}>
      <div>Breadcrumb component</div>

      <div className="flex w-full pt-10">
        <aside className="hidden md:block w-52">Filter component</aside>

        <div className="w-full border-white-100 border-solid border-1 rounded-md p-10 box-border">
          <div>
            <h1>
              {decodeURIComponent(search).replace("+", " ").toLocaleUpperCase()}{" "}
              ({products.length})
            </h1>
          </div>
          <div className="pt-10 flex flex-col gap-2">
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </section>
  );
}
