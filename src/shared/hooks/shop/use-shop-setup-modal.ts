"use client";

import {
  normalizeShopName,
  setCookieShop,
  setupStoreService,
  useProfileStore,
  useShopStore,
} from "@/shared";
import { useState } from "react";

export interface UseModalShopSetupType {
  isEnabled: boolean;
  shop: string | null;
  handlerSaveShop: () => void;
  handlerSetShop: (value: string) => void;
}

export const useShopSetupModal = (): UseModalShopSetupType => {
  const { shopName, disclosure, handleSetShop } = useShopStore();
  const { profile } = useProfileStore();
  const { user } = profile ?? {};
  const { email } = user ?? {};
  const { onClose } = disclosure ?? {};
  const [shop, setShopName] = useState<string | null>(shopName);
  const isEnabled = shop && shop !== shopName ? false : true;

  const handlerSetShop = (value: string) => {
    setShopName(value);
  };

  const handlerSaveShop = async () => {
    if (isEnabled || !shop || !email) return;

    const vtexAccountName = normalizeShopName(shop);

    const response = await setupStoreService(vtexAccountName, email);

    if (!response) return;

    setCookieShop(vtexAccountName);
    handleSetShop(vtexAccountName);
    onClose && onClose();
  };

  return {
    isEnabled,
    shop,
    handlerSaveShop,
    handlerSetShop,
  };
};
