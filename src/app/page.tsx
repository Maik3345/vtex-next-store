"use client";

import { useProfileStore, useShopStore } from "@/shared";

export default function Home() {
  const { profile } = useProfileStore();
  const { shopName } = useShopStore();
  return (
    <div>
      Home page {profile?.email} {shopName}
    </div>
  );
}
