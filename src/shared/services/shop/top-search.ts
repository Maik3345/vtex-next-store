import { TopSearchType } from "@/shared";

export const getTopSearchService = async (
  account: string
): Promise<TopSearchType> => {
  return fetch(
    `https://${account}.vtexcommercestable.com.br/api/io/_v/api/intelligent-search/top_searches?locale=en-US`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  ).then((res) => res.json());
};
