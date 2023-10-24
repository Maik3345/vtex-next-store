import { create } from "zustand";
import { Session } from "next-auth";

export interface ProfileStoreType {
  profile: Session | null;
  setProfile: (profile: Session) => void;
}

export const useProfileStore = create<ProfileStoreType>((set) => ({
  profile: null,
  setProfile: (profile: Session) => {
    set({ profile });
  },
}));
