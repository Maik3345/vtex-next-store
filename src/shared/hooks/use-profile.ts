"use client";

import {
  getSessionService,
  setCookieShop,
  useProfileStore,
  useShopStore,
} from "@shared";
import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export interface UseProfileType {
  profile: Session | null;
}

export const useProfile = (): UseProfileType => {
  const { profile, setProfile } = useProfileStore();
  const { handleSetShop, disclosure } = useShopStore();
  const { onOpen } = disclosure ?? {};
  const { data: session, status } = useSession();

  const getSessionData = async (email: string) => {
    const userData = email ? await getSessionService(email) : null;
    const { vtexAccountName } = userData ?? {};

    if (vtexAccountName) {
      setCookieShop(vtexAccountName);
      handleSetShop(vtexAccountName);
    } else {
      onOpen && onOpen();
    }
  };

  useEffect(() => {
    if (session && session.user && session.user.email && !profile) {
      setProfile(session);
      getSessionData(session.user.email);
    } else if (session === null) {
      signIn();
    }
  }, [session, status]);

  return {
    profile,
  };
};
