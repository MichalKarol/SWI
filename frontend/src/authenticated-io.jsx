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

  return {
    getFavourites,
  };
}
