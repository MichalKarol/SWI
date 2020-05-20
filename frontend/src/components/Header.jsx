import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../auth";
import { SearchContext } from "../search";
import {Dropdown, StyledFieldDropdown} from "../components/Dropdown";
import { Search } from "@material-ui/icons";
import { InputBase, Button } from "@material-ui/core";
import styled from "styled-components";
import {StyledInputBase, StyledSearchButton} from "./StyledComponents";

export function Header() {
    const authContext = useContext(AuthenticationContext);
    const searchContext = useContext(SearchContext);

    const HeaderDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: header;
    background: E5E5E5;
  `;

    return (
        <HeaderDiv className="grid-layout__header">
            <StyledFieldDropdown
                values={[
                    {value: "All", label: "All fields"},
                    {value: "Title", label: "Title"},
                    {value: "Content", label: "Content"},
                ]}
                value={searchContext.state.field || ""}
                onChange={(event) => {
                    const value = event.target.value;
                    searchContext.setState((state) => ({...state, field: value}));
                }}
            />
            <StyledInputBase
                placeholder="Type to search"
                value={searchContext.state.query || ""}
                onChange={(event) => {
                    const value = event.target.value;
                    searchContext.setState((state) => ({...state, query: value}));
                }}
            />
            <StyledSearchButton
                variant="contained"
                color="secondary"
                endIcon={<Search/>}
                size="large"
            >
                Search
            </StyledSearchButton>
            {JSON.stringify(searchContext.state)}
        </HeaderDiv>
    );
}
