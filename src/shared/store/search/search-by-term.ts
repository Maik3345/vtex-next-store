import { SearchResultItem } from "@/shared";
import { create } from "zustand";

export interface SearchByTermStore {
  results: SearchResultItem[];
  term: string;
  totalSearchItems: number;
  setTotalSearchItems: (totalSearchItems: number) => void;
  setTerm: (term: string) => void;
  setResults: (results: SearchResultItem[]) => void;
}

export const useSearchByTermStore = create<SearchByTermStore>((set) => ({
  results: [],
  term: "",
  totalSearchItems: 0,
  setTotalSearchItems: (totalSearchItems) => set({ totalSearchItems }),
  setTerm: (term) => set({ term }),
  setResults: (results) => set({ results }),
}));
