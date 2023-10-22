"use client";

import { useShop, UseShopType } from "@shared";
import { createContext } from "react";

const ShopContext = createContext({} as UseShopType);

export const ShopProvider = () => {
  return <ShopContext.Provider value={useShop()} />;
};
