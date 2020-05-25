import React, { useContext, useState } from "react";
import { SearchContext, generateQueryParams } from "../search";
import { StyledFieldDropdown } from "./Dropdown";
import { Search } from "@material-ui/icons";
import styled from "styled-components";
import { StyledInputBase, StyledSearchButton } from "./StyledComponents";
import { useHistory } from "react-router-dom";

const HeaderForm = styled.form`
  grid-area: header;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: E5E5E5;
  margin-right: 128px;
  margin-top: 16px;
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
  const searchContext = useContext(SearchContext);
  const history = useHistory();
  const [text, setText] = useState(searchContext.state.query || "");

  return (
    <HeaderForm
      onSubmit={(event) => {
        const new_state = {
          ...searchContext.state,
          query: text,
        };
        searchContext.setState(new_state);
        history.push(`/search?${generateQueryParams(new_state)}`);
        event.preventDefault();
      }}
    >
      <HeaderDiv className="grid-layout__header">
        <StyledFieldDropdown
          values={[
            { value: "*", label: "All fields" },
            { value: "title", label: "Title" },
            { value: "contents", label: "Content" },
          ]}
          value={searchContext.state.field || ""}
          onChange={(event) => {
            const value = event.target.value;
            searchContext.setState((state) => ({ ...state, field: value }));
          }}
        />
        <StyleSearchBar
          placeholder="Type to search"
          value={text}
          handleValueChanged={(event) => {
            const value = event.target.value;
            setText(value);
          }}
        />
        <StyledSearchButton
          variant="contained"
          color="secondary"
          endIcon={<Search />}
          size="large"
          type="submit"
        >
          Search
        </StyledSearchButton>
      </HeaderDiv>
    </HeaderForm>
  );
}
