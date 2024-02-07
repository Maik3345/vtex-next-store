import { endpoints } from "@/config";
import { TopSearchType } from "@/shared";

export const getTopSearchService = async (
  account: string
): Promise<TopSearchType> => {
  return fetch(`${endpoints.baseUrl}/api/top-search?account=${account}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
};
