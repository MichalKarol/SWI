import { createContext } from "react";

export function generateQueryParams(searchState) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(searchState)) {
    if (value) {
      searchParams.set(key, value);
    }
  }
  console.log("searchParams", searchParams);
  return searchParams.toString();
}

export function getInitSearchState(search) {
  const searchParams = new URLSearchParams(search);
  const searchState = {
    query: searchParams.get("query") || "",
    field: searchParams.get("field") || "*",
    sort: searchParams.get("sort") || " ",
    topics:
      (searchParams.get("topics") && searchParams.get("topics").split(",")) ||
      [],
    components:
      (searchParams.get("components") &&
        searchParams.get("components").split(",")) ||
      [],
    dateTo: searchParams.get("dateTo") || "",
    dateFrom: searchParams.get("dateFrom") || "",
  };
  return searchState;
}

export const SearchContext = createContext({
  state: {},
  setState: (_) => {},
});
