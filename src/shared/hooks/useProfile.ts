import { useState, useEffect } from "react";
import { ProfileInformationType, getProfileService } from "@shared";

export interface UseProfileType {
  profile: ProfileInformationType | null;
  handleGetProfile: () => Promise<void>;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileInformationType | null>(null);

  const handlerGetLocalProfile = () => {
    const localProfile = localStorage.getItem("profile");
    if (localProfile) {
      const data = JSON.parse(localProfile);
      if (!data?.email) {
        return false;
      }
      setProfile(data);
      return true;
    }
    return false;
  };

  const handleGetProfile = async () => {
    if (!handlerGetLocalProfile()) {
      const response = await getProfileService();
      localStorage.setItem("profile", JSON.stringify(response.results[0]));
      setProfile(response.results[0]);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return {
    profile,
    handleGetProfile,
  };
};
