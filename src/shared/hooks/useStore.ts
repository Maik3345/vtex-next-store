import { useState } from "react";

export interface UseStoreType {
  storeName: string | null;
  handleSetStore: (store: string) => void;
}

export const useStore = () => {
  const [storeName, setStoreName] = useState<string | null>(null);

  const handleSetStore = (store: string) => {
    setStoreName(store);
  };

  return { storeName, handleSetStore };
};
