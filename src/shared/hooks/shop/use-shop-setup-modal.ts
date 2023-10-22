"use client";

import { useShopStore } from "@/shared";
import { useState } from "react";

export interface UseModalShopSetupType {
  isEnabled: boolean;
  shop: string | null;
  handlerSaveShop: () => void;
  handlerSetShop: (value: string) => void;
}

export const useShopSetupModal = (): UseModalShopSetupType => {
  const { shopName, disclosure, handleSetShop } = useShopStore();
  const { onClose } = disclosure ?? {};
  const [shop, setShopName] = useState<string | null>(shopName);
  const isEnabled = shop && shop !== shopName ? false : true;

  const handlerSetShop = (value: string) => {
    setShopName(value);
  };

  const handlerSaveShop = () => {
    if (isEnabled || !shop) return;
    handleSetShop(shop);
    onClose && onClose();
  };

  return {
    isEnabled,
    shop,
    handlerSaveShop,
    handlerSetShop,
  };
};
