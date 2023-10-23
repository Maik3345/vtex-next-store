"use client";

import { useProfileStore, useShopStore } from "@/shared";

export default function SearchPage() {
  const { profile } = useProfileStore();
  const { shopName } = useShopStore();

  return (
    <div>
      Search page {profile?.email} {shopName}
    </div>
  );
}
