import { createContext } from "react";

export function generateQueryParams(searchState) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(searchState)) {
    searchParams.set(key, value);
  }
  return searchParams.toString();
}

export const SearchContext = createContext({
  state: {},
  setState: (_) => {},
});
