"use client";
import { useProfileContext, useStoreContext } from "@/shared";
import {
  Avatar,
  AvatarGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { StoreSetupModal } from "../StoreSetupModal";
import { useEffect, useState } from "react";

export const DropDownComponent = () => {
  const { profile } = useProfileContext();
  const { shortStoreName, onOpen } = useStoreContext();
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setShowComponent(false);
    setTimeout(() => {
      setShowComponent(true);
    }, 100);
  }, [shortStoreName]);

  if (!profile || !showComponent) return null;

  return (
    <>
      <Dropdown placement="bottom-end">
        <AvatarGroup isBordered>
          {shortStoreName && (
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              onClick={onOpen}
              icon={<p>{shortStoreName.charAt(0).toUpperCase()}</p>}
            />
          )}
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={profile.picture?.thumbnail}
            />
          </DropdownTrigger>
        </AvatarGroup>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p>{profile?.email}</p>
          </DropdownItem>
          <DropdownItem onPress={onOpen} key="settings">
            <p>
              {shortStoreName
                ? `Current store: ${shortStoreName}`
                : "Configure store:"}
            </p>
            Setup the store
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <StoreSetupModal />
    </>
  );
};
