"use client";

import { useShop, UseShopType } from "@shared";
import { createContext } from "react";

const ShopContext = createContext({} as UseShopType);

export const ShopProvider = () => {
  const context = useShop();

  return <ShopContext.Provider value={context} />;
};
