import { ProductList } from "@/components";
import { searchProductsService } from "@/shared";
import styles from "./index.module.css";

export default async function SearchPage({
  searchParams,
  params: { search },
}: {
  params: {
    search: string;
  };
  searchParams: Record<string, string>;
}) {
  const products = await searchProductsService("puntoscolombia", searchParams);

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
