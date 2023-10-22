"use client";

import {
  ChevronRightLinearIcon,
  DocumentCodeBoldIcon,
  HashBoldIcon,
  SearchLinearIcon,
} from "@/components";
import { SearchResultItem, useCmdkContext } from "@/shared";
import { Command } from "cmdk";
import Image from "next/image";

export const CmdkItem = ({
  item,
  index,
  isRecent = false,
}: {
  item: SearchResultItem;
  index: number;
  isRecent?: boolean;
}) => {
  const {
    slots,
    activeItem,
    menuNodes,
    eventRef,
    setActiveItem,
    onItemSelect,
  } = useCmdkContext();

  const isLvl1 = item.type === "lvl1";
  const image = item.thumbnail;

  const mainIcon = isRecent ? (
    <SearchLinearIcon className={slots.leftIcon()} size={20} strokeWidth={2} />
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
        {image ? (
          <Image
            src={image.imageUrl}
            alt={image.imageLabel}
            className="border border-default-200 rounded-xl"
            width={50}
            height={50}
          />
        ) : (
          mainIcon
        )}
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
};
