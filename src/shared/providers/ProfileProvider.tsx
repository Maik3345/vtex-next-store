import React, { createContext, ReactNode, useContext } from "react";
import { useProfile, UseProfileType } from "@shared";

export interface ProfileContextType extends UseProfileType {}

const ProfileContext = createContext<ProfileContextType>(
  {} as ProfileContextType
);

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const context = useProfile();

  return (
    <ProfileContext.Provider value={context}>
      {children}
    </ProfileContext.Provider>
  );
};
