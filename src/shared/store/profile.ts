import { create } from "zustand";
import { Session } from "next-auth";

export interface ProfileStoreType {
  profile: Session | null;
  setProfile: (profile: Session | null) => void;
}

export const useProfileStore = create<ProfileStoreType>((set) => ({
  profile: null,
  setProfile: (profile: Session | null) => {
    set({ profile });
  },
}));
