"use client";

import {
  SearchResultItem,
  getSearchSuggestionsService,
  useSearchByTermStore,
  useShopStore,
} from "@/shared";
import { useEffect, useState } from "react";

export interface UseSearchSuggestions {
  searchSuggestions: SearchResultItem[];
}

export const useSearchSuggestions = (): UseSearchSuggestions => {
  const { shopName } = useShopStore();
  const { term } = useSearchByTermStore();
  const [searchSuggestions, setSearchSuggestions] = useState<
    SearchResultItem[]
  >([]);

  const handleGetSearchSuggestions = async (termSearch: string) => {
    if (shopName) {
      const response = await getSearchSuggestionsService(shopName, termSearch);

      if (!response || !response.searches || response.searches.length === 0) {
        setSearchSuggestions([]);
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
      setSearchSuggestions(mappedSearch);
    }
  };

  useEffect(() => {
    if (term == null || term.trim() === "") {
      setSearchSuggestions([]);
      return;
    }

    const urlParams = term.trim().replace(/\s/g, "+");

    if (urlParams && urlParams.length > 3) {
      handleGetSearchSuggestions(urlParams);
    }
  }, [term]);

  return { searchSuggestions };
};
