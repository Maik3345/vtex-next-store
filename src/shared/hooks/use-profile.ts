"use client";

import { useProfileStore } from "@shared";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export interface UseProfileType {
  profile: Session | null;
}

export const useProfile = (): UseProfileType => {
  const store = useProfileStore();
  const { data: session, status } = useSession();
  const { profile, setProfile } = store;

  useEffect(() => {
    if (session && session.user && session.user.email) {
      setProfile(session);
    }
  }, [session, status]);

  return {
    profile,
  };
};
