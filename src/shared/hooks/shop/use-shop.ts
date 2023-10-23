"use client";

import { SHOP_KEY } from "@/config";
import { useShopStore } from "@/shared";
import { useDisclosure } from "@nextui-org/react";
import useLocalStorage from "@rehooks/local-storage";
import { useEffect } from "react";

export interface UseShopType {}

export const useShop = (): UseShopType => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [localShop] = useLocalStorage<string>(SHOP_KEY);
  const { shopName, setDisclosure, handleSetShop } = useShopStore();

  const handleGetLocalShop = () => {
    if (localShop) {
      handleSetShop(localShop);
    } else {
      onOpen();
    }
  };

  useEffect(() => {
    handleGetLocalShop();
  }, [shopName]);

  useEffect(() => {
    setDisclosure({
      isOpen,
      onOpen,
      onClose,
      onOpenChange,
    });
  }, [isOpen]);

  return {};
};
