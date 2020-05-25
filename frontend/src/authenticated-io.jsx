import { useContext } from "react";
import { AuthenticationContext } from "./auth";

function generateSOLRQueryParams(searchContext) {
  const queryParams = new URLSearchParams();

  const queryParts = [
    searchContext.query
      ? searchContext.field === "*"
        ? searchContext.query
        : `${searchContext.field}:${searchContext.query}`
      : "*:*",
    ...(searchContext.dateFrom || searchContext.dateTo
      ? [
          `date:[${searchContext.dateFrom ? searchContext.dateFrom : "*"} TO ${
            searchContext.dateTo ? searchContext.dateTo : "*"
          }]`,
        ]
      : []),
    ...(searchContext.components.length > 0
      ? [
          searchContext.components
            .map((component) => `components:"${component}"`)
            .join(" || "),
        ]
      : []),
    ...(searchContext.topics.length > 0
      ? [searchContext.topics.map((topic) => `topics:"${topic}"`).join(" || ")]
      : []),
  ];

  queryParams.set("q", queryParts.join(" && "));
  if (searchContext.sort.trim()) {
    queryParams.set("sort", searchContext.sort.trim());
  }
  return queryParams;
}

export function useAuthenticatedIO() {
  const authContext = useContext(AuthenticationContext);
  function logoutOnUnauthenticated(promise) {
    return promise
      .then((res) => {
        if (res.status === 401) {
          authContext.setToken("");
          window.location.href = "/";
        }
        return res;
      })
      .catch((res) => {
        authContext.setToken("");
        window.location.href = "/";
      });
  }
  function getFavourites() {
    return logoutOnUnauthenticated(
      fetch("/api/stars/", {
        method: "GET",
        headers: [["Authorization", `Token ${authContext.token}`]],
      })
    ).then((res) => res.json());
  }

  function changeFavourite(doc_id) {
    return fetch("/api/stars/", {
      method: "POST",
      headers: [
        ["Authorization", `Token ${authContext.token}`],
        ["Content-Type", "application/json"],
      ],
      body: JSON.stringify({
        doc_id,
      }),
    });
  }

  function search(search_context, offset = 0) {
    const queryParams = generateSOLRQueryParams(search_context);
    queryParams.set("start", offset);
    return logoutOnUnauthenticated(
      fetch(`/api/search/select?${queryParams.toString()}`, {
        method: "GET",
        headers: [["Authorization", `Token ${authContext.token}`]],
      })
    ).then((r) => r.json());
  }

  function getDocuments(ids) {
    const query = ids.map((id) => `id:${id}`).join(" || ");
    return logoutOnUnauthenticated(
      fetch(`/api/search/select?q=${query}`, {
        method: "GET",
        headers: [["Authorization", `Token ${authContext.token}`]],
      })
    ).then((r) => r.json());
  }

  return {
    getFavourites,
    changeFavourite,
    search,
    getDocuments,
  };
}
