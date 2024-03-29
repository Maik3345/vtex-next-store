"use client";

import { SearchResultItem, getTopSearchService, useShopStore } from "@/shared";
import { useEffect, useState } from "react";

export interface UseTopSearchType {
  topSearch: SearchResultItem[];
}

export const useTopSearch = (): UseTopSearchType => {
  const { shopName } = useShopStore();
  const [topSearch, setTopSearch] = useState<SearchResultItem[]>([]);

  const handleGetTopSearch = async () => {
    if (shopName) {
      const response = await getTopSearchService(shopName);

      if (!response || !response.searches || response.searches.length === 0) {
        setTopSearch([]);
        return;
      }

      const mappedSearch: SearchResultItem[] = response.searches.map(
        (search) => ({
          content: search.term,
          objectID: search.term,
          type: "lvl1",
          url: `/${search.term}?map=ft&_q=${search.term}`,
          hierarchy: { lvl1: search.term },
        })
      );
      setTopSearch(mappedSearch);
    }
  };

  useEffect(() => {
    handleGetTopSearch();
  }, [shopName]);

  return { topSearch };
};
