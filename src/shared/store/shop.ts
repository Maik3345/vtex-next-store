import { writeStorage } from "@rehooks/local-storage";
import { create } from "zustand";
import { normalizeShopName, sliceShopName } from "..";
import { SHOP_KEY } from "@/config";

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
  handleSetShop: (shopName: string) => void;
}

export const useShopStore = create<ShopStoreType>((set) => ({
  shopName: null,
  shortShopName: null,
  disclosure: null,
  setDisclosure: (disclosure) => set({ disclosure }),
  handleSetShop: (shop: string) => {
    set({
      shopName: normalizeShopName(shop),
      shortShopName: sliceShopName(shop),
    });
    writeStorage(SHOP_KEY, shop);
  },
}));
