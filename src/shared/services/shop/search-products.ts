import { endpoints } from "@/config";
import { buildQuery } from "@/shared";

export const searchProductsService = async (
  account: string,
  searchParams: Record<string, string>
) => {
  const params = buildQuery(searchParams);

  if (!params || params === "") return [];

  const url = `${endpoints.baseUrl}/api/search-products?account=${account}&${params}`;
  console.log({ urlSearch: url });

  const response = await fetch(url);
  const data = await response.json();
  return data?.products ?? [];
};
