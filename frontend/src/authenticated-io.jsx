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
        headers: [["Authorization", `Token ${token}`]],
      }).then((res) => res.json())
    );
  }

  function setFavourite(doc_id) {
    return logoutOnUnauthenticated(
      fetch("/api/stars/", {
        method: "POST",
        headers: [["Authorization", `Token ${token}`]],
        body: {
          doc_id,
        },
      }).then((res) => res.json())
    );
  }

  function removeFavourite(star_id) {
    return logoutOnUnauthenticated(
      fetch(`/api/stars/${star_id}/`, {
        method: "DELETE",
        headers: [["Authorization", `Token ${token}`]],
      })
    );
  }

  return {
    getFavourites,
    setFavourite,
    removeFavourite,
  };
}
