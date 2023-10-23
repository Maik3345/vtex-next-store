import { TopSearchType } from "@/shared";

export const getSearchSuggestionsService = async (
  account: string,
  term: string
): Promise<TopSearchType> => {
  return fetch(`/api/search-suggestions?account=${account}&term=${term}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
};
