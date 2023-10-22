"use client";

import { useProfile, UseProfileType } from "@shared";
import { createContext } from "react";

const ProfileContext = createContext({} as UseProfileType);

export const ProfileProvider = () => {
  return <ProfileContext.Provider value={useProfile()} />;
};
