"use client";

import { useProfile, UseProfileType } from "@shared";
import { createContext } from "react";

const ProfileContext = createContext({} as UseProfileType);

export const ProfileProvider = () => {
  const context = useProfile();

  return <ProfileContext.Provider value={context} />;
};
