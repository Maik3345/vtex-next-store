import { endpoints } from "@/config";
import { ProductSearchType } from "@/shared";

export const getSearchByTermService = async (
  account: string,
  term: string
): Promise<ProductSearchType> => {
  return fetch(
    `${endpoints.baseUrl}/api/search-by-term?account=${account}&query=${term}&simulationBehavior=default&count=5&page=1&sort=price:desc&locale=en-US&hideUnavailableItems=false`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  ).then((res) => res.json());
};
