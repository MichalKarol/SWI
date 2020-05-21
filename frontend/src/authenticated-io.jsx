import { useContext } from "react";
import { AuthenticationContext } from "./auth";

export function useAuthenticatedIO(token) {
  const authContext = useContext(AuthenticationContext);
  function logoutOnUnauthenticated(promise) {
    return promise.catch((res) => {
      authContext.setToken("");
      window.location.href = "/";
    });
  }
  function getFavourites() {
    return logoutOnUnauthenticated(
      fetch("/api/stars/", {
        method: "GET",
        // headers: [["Authorization", `Token ${token}`]],
      }).then((res) => res.json())
    );
  }

  function changeFavourite(doc_id) {
    return logoutOnUnauthenticated(
      fetch("/api/stars/", {
        method: "POST",
        headers: [
          // ["Authorization", `Token ${token}`]
          ["Content-Type", "application/json"],
        ],
        body: JSON.stringify({
          doc_id,
        }),
      })
    );
  }

  function search(search_context, offset = 0) {
    return logoutOnUnauthenticated(
      fetch(
        `/api/search/select?q=JUSTICE+DEPARTMENT+FILES+LAWSUIT&start=${offset}`,
        {
          method: "GET",
          // headers: [["Authorization", `Token ${token}`]],
        }
      ).then((r) => r.json())
    );
  }

  function getDocuments(ids) {
    const query = ids.map((id) => `id:${id}`).join(" || ");
    return logoutOnUnauthenticated(
      fetch(`/api/search/select?q=${query}`, {
        method: "GET",
        // headers: [["Authorization", `Token ${token}`]],
      }).then((r) => r.json())
    );
  }

  return {
    getFavourites,
    changeFavourite,
    search,
    getDocuments,
  };
}
