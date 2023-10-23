"use client";

import { trackEvent, useShopStore, useCmdkStore } from "@/shared";
import { clsx } from "@nextui-org/shared-utils";
import { isAppleDevice } from "@react-aria/utils";
import { useEffect, useState } from "react";
import { SearchLinearIcon } from "../icons";
import { dataFocusVisibleClasses } from "@nextui-org/theme";
import { Button, Kbd } from "@nextui-org/react";

export const SearchBar = () => {
  const { shortShopName } = useShopStore();
  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("command");
  const { onOpen: onOpenCmdk } = useCmdkStore();

  useEffect(() => {
    setCommandKey(isAppleDevice() ? "command" : "ctrl");
  }, []);

  const handleOpenCmdk = () => {
    onOpenCmdk();
    trackEvent("Navbar - Search", {
      name: "navbar - search",
      action: "press",
      category: "cmdk",
    });
  };

  return (
    <>
      <div className="hidden md:flex">
        <Button
          aria-label="Quick search"
          className="text-sm font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
          endContent={
            <Kbd
              className="hidden py-0.5 px-2 lg:inline-block"
              keys={commandKey}
            >
              K
            </Kbd>
          }
          startContent={
            <SearchLinearIcon
              className="text-base text-default-400 pointer-events-none flex-shrink-0"
              size={18}
              strokeWidth={2}
            />
          }
          onPress={handleOpenCmdk}
        >
          Quick Search in {shortShopName}...
        </Button>
      </div>

      <div className="flex md:hidden">
        <button
          onClick={handleOpenCmdk}
          className={clsx(
            "transition-opacity p-1 hover:opacity-80 rounded-full cursor-pointer outline-none",
            // focus ring
            ...dataFocusVisibleClasses
          )}
        >
          <SearchLinearIcon
            className="mt-px text-default-600 dark:text-default-500"
            size={20}
          />
        </button>
      </div>
    </>
  );
};
