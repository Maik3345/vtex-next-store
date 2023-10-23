import { create } from "zustand";
import { ProfileInformationType } from "..";
import { writeStorage } from "@rehooks/local-storage";
import { PROFILE_KEY } from "@/config";

export interface ProfileStoreType {
  profile: ProfileInformationType | null;
  setProfile: (profile: ProfileInformationType) => void;
}

export const useProfileStore = create<ProfileStoreType>((set) => ({
  profile: null,
  setProfile: (profile: ProfileInformationType) => {
    writeStorage(PROFILE_KEY, profile);
    set({ profile });
  },
}));
