import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthenticationContext } from "../auth";
import { Login } from "./Login";
import { Header } from "../components/Header";
import "./style.css";
import { Search } from "./Search";
import { Document } from "./Document";
import { FavouriteList } from "./FavouriteList";

export function AuthenticatedRoutes() {
  const auth = useContext(AuthenticationContext);

  return auth.token ? (
    <div className="auth-view">
      <Router>
        <div className="auth-header">
          <Header />
        </div>
        <div className="auth-content">
          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/documennt/:id">
              <Document />
            </Route>
            <Route path="/favourite">
              <FavouriteList />
            </Route>
            <Route path="*">
              <Redirect to="/search" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  ) : (
    <Login />
  );
}
