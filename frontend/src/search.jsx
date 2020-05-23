import { createContext } from "react";

export function generateQueryParams(searchState) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(searchState)) {
    //TODO Set other values, sort with empty will not work, therefore sort with space is not appended
    if (key === "sort" && value === " ") {

    } else {
      searchParams.set(key, value);
    }
  }
  return searchParams.toString();
}

export const SearchContext = createContext({
  state: {},
  setState: (_) => {},
});
