"use client";
import { useProfileContext } from "@/shared";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export const DropDownComponent = () => {
  const { profile } = useProfileContext();

  if (!profile) return null;

  console.log("profile", profile);

  return (
    <Dropdown placement="bottom-end">
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
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{profile?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">Setup the store to use</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
