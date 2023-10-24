"use client";

import { useProfileStore, useShopStore } from "@/shared";
import {
  Avatar,
  AvatarGroup,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Dropdown as UIDropdown,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ShopSetupModal } from "../shop-setup-modal";

export const DropDown = () => {
  const { profile } = useProfileStore();
  const { shortShopName, disclosure } = useShopStore();
  const { onOpen } = disclosure ?? {};
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setShowComponent(false);
    setTimeout(() => {
      setShowComponent(true);
    }, 100);
  }, [shortShopName]);

  if (!showComponent) return null;

  if (status === "loading") return <p>Validating session</p>;

  if (!profile) {
    return <Link href="/api/auth/signin">Log in</Link>;
  }

  if (profile) {
    return (
      <>
        <UIDropdown placement="bottom-end">
          <AvatarGroup isBordered>
            {shortShopName && (
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                onClick={onOpen}
                icon={<p>{shortShopName.charAt(0).toUpperCase()}</p>}
              />
            )}
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={profile.user?.name ?? ""}
                size="sm"
                src={profile.user?.image ?? ""}
              />
            </DropdownTrigger>
          </AvatarGroup>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p>{profile.user?.email}</p>
            </DropdownItem>
            <DropdownItem onPress={onOpen} key="settings">
              <p>
                {shortShopName
                  ? `Current shop: ${shortShopName}`
                  : "Configure shop:"}
              </p>
              Setup the shop
            </DropdownItem>
          </DropdownMenu>
        </UIDropdown>
        <ShopSetupModal />
      </>
    );
  }
};
