"use client";

import {
  Link,
  Navbar as UINavBar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { SearchBar } from "..";
import { AcmeLogo } from "../icons";
import { DropDown } from "./components";

const NavBar = () => {
  return (
    <UINavBar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link color="foreground" href="/">
            <AcmeLogo />
            <p>VtexStore</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <SearchBar />
        <DropDown />
      </NavbarContent>
    </UINavBar>
  );
};

export default NavBar;
