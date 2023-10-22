/* eslint-disable jsx-a11y/no-autofocus */
"use client";

import {
  MATCH_KEYS,
  MAX_RECENT_SEARCHES,
  MAX_RESULTS,
  RECENT_SEARCHES_KEY,
} from "@/config";
import searchData from "@/config/search-meta.json";
import { trackEvent, useCmdkStore } from "@/shared";
import { isAppleDevice } from "@react-aria/utils";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import { intersectionBy, isEmpty } from "lodash";
import { matchSorter } from "match-sorter";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  ButtonProps,
  Kbd,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { CloseIcon } from "@nextui-org/shared-icons";
import { clsx } from "@nextui-org/shared-utils";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MultiRef from "react-multi-ref";
import scrollIntoView from "scroll-into-view-if-needed";
import { tv } from "tailwind-variants";
import { useUpdateEffect } from "..";

export interface UseCmdkType {}

export interface SearchResultItem {
  content: string;
  objectID: string;
  url: string;
  type: "lvl1" | "lvl2" | "lvl3";
  hierarchy: {
    lvl1: string | null;
    lvl2?: string | null;
    lvl3?: string | null;
  };
}

const cmdk = tv({
  slots: {
    base: "max-h-full overflow-y-auto",
    header: [
      "flex",
      "items-center",
      "w-full",
      "px-4",
      "border-b",
      "border-default-400/50",
      "dark:border-default-100",
    ],
    searchIcon: "text-default-400 text-lg",
    input: [
      "w-full",
      "px-2",
      "h-14",
      "font-sans",
      "text-lg",
      "outline-none",
      "rounded-none",
      "bg-transparent",
      "text-default-700",
      "placeholder-default-500",
      "dark:text-default-500",
      "dark:placeholder:text-default-300",
    ],
    list: ["px-4", "mt-2", "pb-4", "overflow-y-auto", "max-h-[50vh]"],
    itemWrapper: [
      "px-4",
      "mt-2",
      "group",
      "flex",
      "h-16",
      "justify-between",
      "items-center",
      "rounded-lg",
      "shadow",
      "bg-content2/50",
      "active:opacity-70",
      "cursor-pointer",
      "transition-opacity",
      "data-[active=true]:bg-primary",
      "data-[active=true]:text-primary-foreground",
    ],
    leftWrapper: ["flex", "gap-3", "items-center", "w-full", "max-w-full"],
    leftIcon: [
      "text-default-500 dark:text-default-300",
      "group-data-[active=true]:text-primary-foreground",
    ],
    itemContent: ["flex", "flex-col", "gap-0", "justify-center", "max-w-[80%]"],
    itemParentTitle: [
      "text-default-400",
      "text-xs",
      "group-data-[active=true]:text-primary-foreground",
      "select-none",
    ],
    itemTitle: [
      "truncate",
      "text-default-500",
      "group-data-[active=true]:text-primary-foreground",
      "select-none",
    ],
    emptyWrapper: [
      "flex",
      "flex-col",
      "text-center",
      "items-center",
      "justify-center",
      "h-32",
    ],
  },
});

const hideOnPaths = ["examples"];

export const useCmdk = () => {
  const [query, setQuery] = useState("");
  const [activeItem, setActiveItem] = useState(0);
  const [menuNodes] = useState(() => new MultiRef<number, HTMLElement>());
  const slots = useMemo(() => cmdk(), []);
  const pathname = usePathname();
  const eventRef = useRef<"mouse" | "keyboard">();
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useCmdkStore();
  const [recentSearches] =
    useLocalStorage<SearchResultItem[]>(RECENT_SEARCHES_KEY);
  const shouldOpen = !hideOnPaths.some((path) => pathname?.includes(path));

  const addToRecentSearches = (item: SearchResultItem) => {
    let searches = recentSearches ?? [];

    // Avoid adding the same search again
    if (!searches.find((i) => i.objectID === item.objectID)) {
      writeStorage(
        RECENT_SEARCHES_KEY,
        [item, ...searches].slice(0, MAX_RECENT_SEARCHES)
      );
    } else {
      // Move the search to the top
      searches = searches.filter((i) => i.objectID !== item.objectID);
      writeStorage(
        RECENT_SEARCHES_KEY,
        [item, ...searches].slice(0, MAX_RECENT_SEARCHES)
      );
    }
  };

  const results = useMemo<SearchResultItem[]>(
    function getResults() {
      if (query.length < 2) return [];

      const data = searchData as SearchResultItem[];

      const words = query.split(" ");

      if (words.length === 1) {
        return matchSorter(data, query, {
          keys: MATCH_KEYS,
        }).slice(0, MAX_RESULTS);
      }

      const matchesForEachWord = words.map((word) =>
        matchSorter(data, word, {
          keys: MATCH_KEYS,
        })
      );

      const matches = intersectionBy(...matchesForEachWord, "objectID").slice(
        0,
        MAX_RESULTS
      );

      trackEvent("Cmdk - Search", {
        name: "cmdk - search",
        action: "search",
        category: "cmdk",
        data: {
          query,
          words,
          matches: matches?.map((match) => match.url).join(", "),
        },
      });

      return matches;
    },
    [query]
  );

  const items = !isEmpty(results) ? results : recentSearches ?? [];

  // Toggle the menu when ⌘K / CTRL K is pressed
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const hotkey = isAppleDevice() ? "metaKey" : "ctrlKey";

      if (e?.key?.toLowerCase() === "k" && e[hotkey]) {
        e.preventDefault();
        isOpen ? onClose() : onOpen();

        trackEvent("Cmdk - Open/Close", {
          name: "cmdk - open/close",
          action: "keydown",
          category: "cmdk",
          data: isOpen ? "close" : "open",
        });
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const onItemSelect = useCallback(
    (item: SearchResultItem) => {
      onClose();
      router.push(item.url);
      addToRecentSearches(item);

      trackEvent("Cmdk - ItemSelect", {
        name: item.content,
        action: "click",
        category: "cmdk",
        data: item.url,
      });
    },
    [router, recentSearches]
  );

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      eventRef.current = "keyboard";
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          if (activeItem + 1 < items.length) {
            setActiveItem(activeItem + 1);
          }
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          if (activeItem - 1 >= 0) {
            setActiveItem(activeItem - 1);
          }
          break;
        }
        case "Control":
        case "Alt":
        case "Shift": {
          e.preventDefault();
          break;
        }
        case "Enter": {
          if (items?.length <= 0) {
            break;
          }

          onItemSelect(items[activeItem]);

          break;
        }
      }
    },
    [activeItem, items, router]
  );

  useUpdateEffect(() => {
    setActiveItem(0);
  }, [query]);

  useUpdateEffect(() => {
    if (!listRef.current || eventRef.current === "mouse") return;
    const node = menuNodes.map.get(activeItem);

    if (!node) return;
    scrollIntoView(node, {
      scrollMode: "if-needed",
      behavior: "smooth",
      block: "end",
      inline: "end",
      boundary: listRef.current,
    });
  }, [activeItem]);

  return useMemo(() => {
    return {
      slots,
      query,
      items,
      activeItem,
      listRef,
      isOpen,
      menuNodes,
      recentSearches,
      results,
      eventRef,
      pathname,
      shouldOpen,
      setQuery,
      setActiveItem,
      onInputKeyDown,
      onItemSelect,
      onClose,
    };
  }, [
    slots,
    shouldOpen,
    query,
    items,
    activeItem,
    listRef,
    isOpen,
    menuNodes,
    recentSearches,
    results,
    eventRef,
    pathname,
  ]);
};
