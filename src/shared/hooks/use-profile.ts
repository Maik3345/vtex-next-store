"use client";

import { PROFILE_KEY } from "@/config";
import useLocalStorage from "@rehooks/local-storage";
import {
  ProfileInformationType,
  getProfileService,
  useProfileStore,
} from "@shared";
import { useEffect } from "react";

export interface UseProfileType {
  profile: ProfileInformationType | null;
  handleGetProfile: () => Promise<void>;
}

export const useProfile = (): UseProfileType => {
  const store = useProfileStore();
  const { profile, setProfile } = store;
  const [localProfile] = useLocalStorage<ProfileInformationType>(PROFILE_KEY);

  const handleGetProfile = async () => {
    const response = await getProfileService();
    if (!response.results) return;
    setProfile(response.results[0]);
  };

  const handlerGetLocalProfile = () => {
    if (!localProfile || !localProfile?.email) {
      return false;
    }

    setProfile(localProfile);
    return true;
  };

  useEffect(() => {
    if (!handlerGetLocalProfile()) {
      handleGetProfile();
    }
  }, []);

  return {
    profile,
    handleGetProfile,
  };
};
