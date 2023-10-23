import {
  useCmdkContext,
  useSearchByTermStore,
  useSearchSuggestions,
} from "@/shared";
import { Listbox, ListboxItem } from "@nextui-org/react";

export const SearchSuggestions = () => {
  const { searchSuggestions } = useSearchSuggestions();
  const { results } = useSearchByTermStore();
  const { onItemSelect } = useCmdkContext();

  if (results.length === 0) return null;

  return (
    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      <div className="flex items-center justify-between">
        <p className="pl-10 text-default-600">Search suggestion</p>
      </div>

      {searchSuggestions && searchSuggestions.length ? (
        <Listbox
          items={searchSuggestions}
          aria-label="Search Suggestions actions"
        >
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
      ) : (
        <p>Suggestions not found</p>
      )}
    </div>
  );
};
