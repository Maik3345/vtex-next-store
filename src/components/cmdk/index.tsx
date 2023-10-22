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
import { Command } from "cmdk";
import { isEmpty } from "lodash";
import { FC, useCallback } from "react";

import {
  ChevronRightLinearIcon,
  DocumentCodeBoldIcon,
  HashBoldIcon,
  SearchLinearIcon,
} from "../icons";

import { SearchResultItem, useCmdk, useShopStore, useTopSearch } from "@shared";

export const Cmdk: FC<{}> = () => {
  const { topSearch } = useTopSearch();
  const { shopName } = useShopStore();
  const {
    slots,
    query,
    shouldOpen,
    activeItem,
    listRef,
    results,
    isOpen,
    menuNodes,
    eventRef,
    recentSearches,
    setQuery,
    setActiveItem,
    onInputKeyDown,
    onItemSelect,
    onClose,
  } = useCmdk();

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

  const renderItem = useCallback(
    (item: SearchResultItem, index: number, isRecent = false) => {
      const isLvl1 = item.type === "lvl1";

      const mainIcon = isRecent ? (
        <SearchLinearIcon
          className={slots.leftIcon()}
          size={20}
          strokeWidth={2}
        />
      ) : isLvl1 ? (
        <DocumentCodeBoldIcon className={slots.leftIcon()} />
      ) : (
        <HashBoldIcon className={slots.leftIcon()} />
      );

      return (
        <Command.Item
          key={item.objectID}
          ref={menuNodes.ref(index)}
          className={slots.itemWrapper()}
          data-active={index === activeItem}
          value={item.content}
          onMouseEnter={() => {
            eventRef.current = "mouse";

            setActiveItem(index);
          }}
          onSelect={() => {
            if (eventRef.current === "keyboard") {
              return;
            }

            onItemSelect(item);
          }}
        >
          <div className={slots.leftWrapper()}>
            {mainIcon}
            <div className={slots.itemContent()}>
              {!isLvl1 && (
                <span className={slots.itemParentTitle()}>
                  {item.hierarchy.lvl1}
                </span>
              )}
              <p className={slots.itemTitle()}>{item.content}</p>
            </div>
          </div>

          <ChevronRightLinearIcon size={14} />
        </Command.Item>
      );
    },
    [activeItem, onItemSelect, CloseButton, slots]
  );

  return (
    <>
      <Modal
        hideCloseButton
        backdrop="opaque"
        classNames={{
          base: [
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
        isOpen={isOpen && shouldOpen}
        motionProps={{
          onAnimationComplete: () => {
            if (!isOpen) {
              setQuery("");
            }
          },
        }}
        placement="top-center"
        scrollBehavior="inside"
        size="xl"
        onClose={() => onClose()}
      >
        <ModalContent>
          <Command
            className={slots.base()}
            label="Quick search command"
            shouldFilter={false}
          >
            <div className={slots.header()}>
              <SearchLinearIcon
                className={slots.searchIcon()}
                strokeWidth={2}
              />
              <Command.Input
                autoFocus={!isWebKit()}
                className={slots.input()}
                placeholder={`Search in ${shopName}`}
                value={query}
                onKeyDown={onInputKeyDown}
                onValueChange={setQuery}
              />
              {query.length > 0 && <CloseButton onPress={() => setQuery("")} />}
              <Kbd className="hidden md:block border-none px-2 py-1 ml-2 font-medium text-[0.6rem]">
                ESC
              </Kbd>
            </div>
            <Command.List ref={listRef} className={slots.list()} role="listbox">
              {query.length > 0 && (
                <Command.Empty>
                  <div className={slots.emptyWrapper()}>
                    <div>
                      <p>No results for &quot;{query}&quot;</p>
                      {query.length === 1 ? (
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

              {isEmpty(query) &&
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
                      {recentSearches.map((item, index) =>
                        renderItem(item, index, true)
                      )}
                    </Command.Group>
                  )
                ))}

              <Command.Group
                heading={
                  <div className="flex items-center justify-between">
                    <p className="text-default-600">Top search</p>
                  </div>
                }
              >
                {topSearch.map((item: any, index) =>
                  renderItem(item, index + 20, true)
                )}
              </Command.Group>

              {results.map((item, index) => renderItem(item, index))}
            </Command.List>
          </Command>
        </ModalContent>
      </Modal>
      {JSON.stringify(isOpen)}
    </>
  );
};
