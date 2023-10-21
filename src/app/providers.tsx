"use client";
import { ProfileProvider, StoreProvider } from "@/shared";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ProfileProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ProfileProvider>
    </StoreProvider>
  );
}
