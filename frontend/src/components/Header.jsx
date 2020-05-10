import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { AuthenticationContext } from "../auth";

export function Header() {
  const authContext = useContext(AuthenticationContext);
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/search">Nazwa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/search">Wyszukiwanie</Nav.Link>
          <Nav.Link href="/favourite">Ulubione</Nav.Link>
          <Nav.Link
            onClick={() => {
              authContext.setToken("");
            }}
          >
            Wyloguj
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
