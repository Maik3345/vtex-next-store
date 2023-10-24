"use client";

import { ProfileProvider, ShopProvider } from "@/shared";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import ClientProvider from "./context/client-provider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  session: any;
}

export function Providers({ children, themeProps, session }: ProvidersProps) {
  return (
    <ClientProvider session={session}>
      <NextUIProvider>
        <ProfileProvider />
        <ShopProvider />
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </ClientProvider>
  );
}
