"use client";

import {
  SearchResultItem,
  getSearchByTermService,
  trackEvent,
  useSearchByTermStore,
  useShopStore,
} from "@/shared";
import { useEffect } from "react";
import debounce from "lodash.debounce";

export interface UseSearchByTermType {
  results: SearchResultItem[];
  term: string;
  totalSearchItems: number;
  getViewAllUrl: () => string;
  handleSetTerm: (term: string) => void;
}

/**
 * Debounce function to avoid multiple calls to the API, this method is created outside of the hook because react create multiple instances of the hook and the debounce function will be created multiple times.
 */
const callSearchDebounce = debounce((fn: () => void) => fn(), 500);

export const useSearchByTerm = (): UseSearchByTermType => {
  const { shopName } = useShopStore();
  const {
    results,
    term,
    totalSearchItems,
    setResults,
    setTerm,
    setTotalSearchItems,
  } = useSearchByTermStore();

  const handleGetSearchByTerm = async (termSearch: string) => {
    if (shopName) {
      const response = await getSearchByTermService(shopName, termSearch);

      if (!response || !response.products || response.products.length === 0) {
        setResults([]);
        return;
      }

      const mappedSearch: SearchResultItem[] = response.products.map(
        (search) => ({
          content: search.productName,
          objectID: search.cacheId,
          type: "lvl1",
          thumbnail: search.items[0].images[0],
          url: `/${search.linkText}/p`,
          hierarchy: { lvl1: search.cacheId },
        })
      );

      trackEvent("Cmdk - Search", {
        name: "cmdk - search",
        action: "search",
        category: "cmdk",
        data: {
          query: term,
          words: term.split(" "),
          matches: mappedSearch?.map((match) => match.url).join(", "),
        },
      });

      if (response?.pagination?.count) {
        setTotalSearchItems(response?.pagination?.count);
      }
      setResults(mappedSearch);
    }
  };

  const handleSetTerm = (term: string) => {
    setTerm(term);
  };

  const getViewAllUrl = () => {
    const termFormatted = term.trim().replace(/\s/g, "+").toLocaleLowerCase();
    return `/${termFormatted}?_q=${termFormatted}&map=ft`;
  };

  const searchByTerm = (termSearch: string) => {
    if (termSearch == null || termSearch.trim() === "") {
      setTotalSearchItems(0);
      setResults([]);
      return;
    }

    const urlParams = termSearch.trim().replace(/\s/g, "+");

    if (urlParams && urlParams.length > 3) {
      callSearchDebounce(() => handleGetSearchByTerm(urlParams));
    }
  };

  useEffect(() => {
    searchByTerm(term);
  }, [term]);

  return { term, results, totalSearchItems, getViewAllUrl, handleSetTerm };
};
