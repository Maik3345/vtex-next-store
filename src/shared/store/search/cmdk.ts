import { create } from "zustand";

export interface CmdkStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useCmdkStore = create<CmdkStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
