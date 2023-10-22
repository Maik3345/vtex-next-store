/* eslint-disable jsx-a11y/no-autofocus */
"use client";

import {
  Button,
  ButtonProps,
  Kbd,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { CloseIcon } from "@nextui-org/shared-icons";
import { clsx } from "@nextui-org/shared-utils";
import { isWebKit } from "@react-aria/utils";
import {
  CmdkProvider,
  useCmdkContext,
  useSearchByTerm,
  useShopStore,
} from "@shared";
import { Command } from "cmdk";
import { isEmpty } from "lodash";
import Link from "next/link";
import { useCallback } from "react";
import { SearchLinearIcon } from "../icons";
import { CmdkItem, SearchSuggestions, TopSearch } from "./components";

const CmdkWrapper = () => {
  const { term, totalSearchItems, results, getViewAllUrl, handleSetTerm } =
    useSearchByTerm();
  const { shopName } = useShopStore();
  const { slots, listRef, isOpen, recentSearches, onInputKeyDown, onClose } =
    useCmdkContext();

  const CloseButton = useCallback(
    ({
      onPress,
      className,
    }: {
      onPress?: ButtonProps["onPress"];
      className?: ButtonProps["className"];
    }) => {
      return (
        <Button
          isIconOnly
          className={clsx(
            "border data-[hover=true]:bg-content2 border-default-400 dark:border-default-100",
            className
          )}
          radius="full"
          size="sm"
          variant="bordered"
          onPress={onPress}
        >
          <CloseIcon />
        </Button>
      );
    },
    []
  );

  return (
    <Modal
      hideCloseButton
      backdrop="opaque"
      classNames={{
        base: [
          "background-0",
          "mt-[20vh]",
          "border-small",
          "dark:border-default-100",
          "supports-[backdrop-filter]:bg-background/80",
          "dark:supports-[backdrop-filter]:bg-background/30",
          "supports-[backdrop-filter]:backdrop-blur-md",
          "supports-[backdrop-filter]:backdrop-saturate-150",
        ],
        backdrop: ["bg-black/80"],
      }}
      isOpen={isOpen}
      motionProps={{
        onAnimationComplete: () => {
          if (!isOpen) {
            handleSetTerm("");
          }
        },
      }}
      placement="top-center"
      scrollBehavior="inside"
      size="5xl"
      onClose={() => onClose()}
    >
      <ModalContent>
        <Command
          className={slots.base()}
          label="Quick search command"
          shouldFilter={false}
        >
          <div className={slots.header()}>
            <SearchLinearIcon className={slots.searchIcon()} strokeWidth={2} />
            <Command.Input
              autoFocus={!isWebKit()}
              className={slots.input()}
              placeholder={`Search in ${shopName}`}
              value={term}
              onKeyDown={onInputKeyDown}
              onValueChange={handleSetTerm}
            />
            {results.length > 0 && (
              <CloseButton onPress={() => handleSetTerm("")} />
            )}
            <Kbd className="hidden md:block border-none px-2 py-1 ml-2 font-medium text-[0.6rem]">
              ESC
            </Kbd>
          </div>
          <Command.List ref={listRef} className={slots.list()} role="listbox">
            <div className="flex gap-5 pt-10">
              <div className="w-80">
                <TopSearch />
                <SearchSuggestions />
              </div>

              <div className="w-full">
                {term.length > 0 && (
                  <Command.Empty className="h-full">
                    <div className={slots.emptyWrapper()}>
                      <div>
                        <p>No results for &quot;{term}&quot;</p>
                        {term.length === 1 ? (
                          <p className="text-default-400">
                            Try adding more characters to your search term.
                          </p>
                        ) : (
                          <p className="text-default-400">
                            Try searching for something else.
                          </p>
                        )}
                      </div>
                    </div>
                  </Command.Empty>
                )}

                {isEmpty(term) &&
                  (isEmpty(recentSearches) ? (
                    <div className={slots.emptyWrapper()}>
                      <p className="text-default-400">No recent searches</p>
                    </div>
                  ) : (
                    recentSearches &&
                    recentSearches.length > 0 && (
                      <Command.Group
                        heading={
                          <div className="flex items-center justify-between">
                            <p className="text-default-600">Recent</p>
                          </div>
                        }
                      >
                        {recentSearches.map((item, index) => (
                          <CmdkItem
                            key={`recentSearches-${index}`}
                            {...{ item, index, isRecent: true }}
                          />
                        ))}
                      </Command.Group>
                    )
                  ))}

                {results && results.length ? (
                  <Command.Group
                    heading={
                      <div className="flex items-center justify-between">
                        <p className="text-default-600">
                          Products for &quot;{term}&quot;
                        </p>
                      </div>
                    }
                  >
                    {results.map((item, index) => (
                      <CmdkItem key={`results-${index}`} {...{ item, index }} />
                    ))}

                    {totalSearchItems > 0 && (
                      <div className="flex items-center justify-center pt-4 pb-4">
                        <Link
                          href={getViewAllUrl()}
                          className="text-default-600"
                        >
                          View all {totalSearchItems} products
                        </Link>
                      </div>
                    )}
                  </Command.Group>
                ) : null}
              </div>
            </div>
          </Command.List>
        </Command>
      </ModalContent>
    </Modal>
  );
};

export const Cmdk = () => {
  return (
    <CmdkProvider>
      <CmdkWrapper />
    </CmdkProvider>
  );
};
