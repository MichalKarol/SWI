import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthenticationContext } from "../auth";
import { SearchContext } from "../search";
import { Login } from "./Login";
import { Header } from "../components/Header";
import { UserBar } from "../components/UserBar";
import "./style.css";
import { Search } from "./Search";
import { Document } from "./Document";
import { FavouriteList } from "./FavouriteList";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import styled from "styled-components";

export function AuthenticatedRoutes() {
  const auth = useContext(AuthenticationContext);
  const searchContext = useContext(SearchContext);

  const [searchState, setSearchState] = useState({});

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#606060",
      },
      secondary: {
        main: "#584DDE",
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      {/* {auth.token ? ( */}
      <Router>
        <SearchContext.Provider
          value={{
            state: searchState,
            setState: setSearchState,
          }}
        >
          <Switch>
            <Route path="/search">
              <GridLayout>
                <Search />
              </GridLayout>
            </Route>
            <Route path="/document/:id">
              <GridLayout>
                <Document />
              </GridLayout>
            </Route>
            <Route path="/favourite">
              <FavouriteList />
            </Route>
            <Route path="*">
              <Redirect to="/search" />
            </Route>
          </Switch>
        </SearchContext.Provider>
      </Router>
    </MuiThemeProvider>
  );
}

function GridLayout(props) {
  const GridLayoutDiv = styled.div`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 5fr 95fr;
    grid-template-rows: 10fr 90fr;
    grid-template-areas:
      "user header"
      "user content";
  `;
  return (
    <GridLayoutDiv>
      <Header />
      <UserBar />
      {props.children}
    </GridLayoutDiv>
  );
}
