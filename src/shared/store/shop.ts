import { create } from "zustand";
import { sliceShopName } from "..";
import { SHOP_KEY } from "@/config";
import { writeStorage } from "@rehooks/local-storage";

interface DisclosureType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
}

export interface ShopStoreType {
  shopName: string | null;
  shortShopName: string | null;
  disclosure: DisclosureType | null;
  setDisclosure: (disclosure: DisclosureType) => void;
  handleSetShop: (shopName: string | null) => void;
}

export const useShopStore = create<ShopStoreType>((set) => ({
  shopName: null,
  shortShopName: null,
  disclosure: null,
  setDisclosure: (disclosure) => set({ disclosure }),
  handleSetShop: (shop: string | null) => {
    set({
      shopName: shop,
      shortShopName: shop ? sliceShopName(shop) : shop,
    });
    writeStorage(SHOP_KEY, shop);
  },
}));
