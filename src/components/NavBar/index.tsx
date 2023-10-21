"use client";
import {
  Button,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { AcmeLogo, SearchIcon } from "../Icons";
import { DropDownComponent } from "./components";
import { useStoreContext } from "@/shared";

export const NavBar = () => {
  const { shortStoreName, onOpen } = useStoreContext();
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link color="foreground" href="/">
            <AcmeLogo />
            <p>VS</p>
          </Link>
        </NavbarBrand>

        {/* <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Landing page
            </Link>
          </NavbarItem>
        </NavbarContent> */}
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder={
            shortStoreName
              ? `Type to search in ${shortStoreName}`
              : "Type to search in ..."
          }
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <DropDownComponent />
      </NavbarContent>
    </Navbar>
  );
};
