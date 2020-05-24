import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../auth";
import { SearchContext } from "../search";
import { StyledFieldDropdown } from "./Dropdown";
import { Search } from "@material-ui/icons";
import styled from "styled-components";
import { StyledInputBase, StyledSearchButton } from "./StyledComponents";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: header;
  background: E5E5E5;
  margin-right: 128px
`;

function StyleSearchBar(props) {
  return (
    <StyledInputBase
      fullWidth
      label={props.label}
      name={props.name}
      value={props.value}
      onChange={props.handleValueChanged}
    />
  );
}

export function Header() {
  const authContext = useContext(AuthenticationContext);
  const searchContext = useContext(SearchContext);

  return (
    <HeaderDiv className="grid-layout__header">
      <StyledFieldDropdown
        values={[
          { value: "*", label: "All fields" },
          { value: "Title", label: "Title" },
          { value: "Content", label: "Content" },
        ]}
        value={searchContext.state.field || ""}
        onChange={(event) => {
          const value = event.target.value;
          searchContext.setState((state) => ({ ...state, field: value }));
        }}
      />
      <StyleSearchBar
        placeholder="Type to search"
        value={searchContext.state.query || ""}
        handleValueChanged={(event) => {
          const value = event.target.value;
          searchContext.setState((state) => ({ ...state, query: value }));
        }}
      />
      <StyledSearchButton
        variant="contained"
        color="secondary"
        endIcon={<Search />}
        size="large"
      >
        Search
      </StyledSearchButton>
      {/*{JSON.stringify(searchContext.state)}*/}
    </HeaderDiv>
  );
}
