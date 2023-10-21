import { useStoreContext } from "@/shared";
import { useState, useEffect } from "react";

export interface UseModalStoreSetupType {}

export const useModalStoreSetup = ({ onClose }: { onClose: () => void }) => {
  const { storeName, handleSetStore } = useStoreContext();
  const [store, setStoreName] = useState<string | null>(storeName);
  const isEnabled = store && store !== storeName ? false : true;

  const handlerSaveStore = () => {
    if (isEnabled || !store) return;
    handleSetStore(store);
    onClose();
  };

  return { isEnabled, store, handlerSaveStore, setStoreName };
};
