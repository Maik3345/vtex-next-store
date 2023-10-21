import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";

export interface UseStoreType {
  storeName: string | null;
  shortStoreName: string | null;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  handleSetStore: (store: string) => void;
}

export const useStore = () => {
  const [storeName, setStoreName] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shortStoreName, setShortStoreName] = useState<string | null>(null);

  const handleGetLocalStore = () => {
    const localStore = localStorage.getItem("store");
    if (localStore) {
      handleApplyStore(localStore);
    } else {
      onOpen();
    }
  };

  const handleApplyStore = (store: string) => {
    setStoreName(store);
    setShortStoreName(store.length > 16 ? `${store.slice(0, 16)}...` : store);
  };

  const handleSetStore = (store: string) => {
    const storeName = store.toLocaleLowerCase().replace(/\s/g, "");
    handleApplyStore(storeName);
    localStorage.setItem("store", storeName);
  };

  useEffect(() => {
    handleGetLocalStore();
  }, []);

  return {
    storeName,
    shortStoreName,
    isOpen,
    onOpen,
    onOpenChange,
    handleSetStore,
  };
};
