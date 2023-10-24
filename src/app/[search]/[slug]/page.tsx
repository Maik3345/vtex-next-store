"use client";

import { useProfileStore, useShopStore } from "@/shared";

export default function ProductPage() {
  const { profile } = useProfileStore();
  const { shopName } = useShopStore();

  return (
    <div>
      Product detail page {profile?.user?.email} {shopName}
    </div>
  );
}
