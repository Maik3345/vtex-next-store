import {
  SearchResultItem,
  getSearchByTermService,
  useShopStore,
} from "@/shared";
import { useEffect, useState } from "react";

export interface UseSearchByTermType {
  searchByTerm: SearchResultItem[];
  term: string;
  totalSearchItems: number;
  getViewAllUrl: () => string;
  handleSetTerm: (term: string) => void;
}

export const useSearchByTerm = (): UseSearchByTermType => {
  const { shopName } = useShopStore();
  const [searchByTerm, setSearchByTerm] = useState<SearchResultItem[]>([]);
  const [term, setTerm] = useState("");
  const [totalSearchItems, setTotalSearchItems] = useState(0);

  const handleGetSearchByTerm = async (term: string) => {
    if (shopName) {
      const response = await getSearchByTermService(shopName, term);
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
      setTotalSearchItems(response.pagination.count);
      setSearchByTerm(mappedSearch);
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
      return;
    }

    const urlParams = term.trim().replace(/\s/g, "+");

    if (urlParams && urlParams.length > 3) {
      handleGetSearchByTerm(urlParams);
    }
  }, [term]);

  return { term, totalSearchItems, searchByTerm, handleSetTerm, getViewAllUrl };
};
