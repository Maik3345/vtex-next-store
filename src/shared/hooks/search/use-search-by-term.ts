import {
  SearchResultItem,
  getSearchByTermService,
  trackEvent,
  useSearchByTermStore,
  useShopStore,
} from "@/shared";
import { useEffect } from "react";

export interface UseSearchByTermType {
  results: SearchResultItem[];
  term: string;
  totalSearchItems: number;
  getViewAllUrl: () => string;
  handleSetTerm: (term: string) => void;
}

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
      const mappedSearch: SearchResultItem[] = response.products.map(
        (search) => ({
          content: search.productName,
          objectID: search.cacheId,
          type: "lvl1",
          thumbnail: search.items[0].images[0],
          url: search.link,
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

  useEffect(() => {
    if (term == null || term.trim() === "") {
      setTotalSearchItems(0);
      setResults([]);
      return;
    }

    const urlParams = term.trim().replace(/\s/g, "+");

    if (urlParams && urlParams.length > 3) {
      handleGetSearchByTerm(urlParams);
    }
  }, [term]);

  return { term, results, totalSearchItems, getViewAllUrl, handleSetTerm };
};
