"use client";

import { useCmdkContext, useSearchByTermStore, useTopSearch } from "@/shared";
import { Listbox, ListboxItem } from "@nextui-org/react";

export const TopSearch = () => {
  const { topSearch } = useTopSearch();
  const { results } = useSearchByTermStore();
  const { onItemSelect } = useCmdkContext();

  if (!topSearch || !topSearch.length || results.length > 0) return null;

  return (
    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      <div className="flex items-center justify-between">
        <p className="pl-10 text-default-600">Top search</p>
      </div>
      <Listbox items={topSearch} aria-label="Top search actions">
        {(item) => (
          <ListboxItem
            onPress={() => onItemSelect(item)}
            key={item.objectID}
            color={"default"}
          >
            {item.content}
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
};
