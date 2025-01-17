import React, {useContext} from "react";
import styled from "styled-components";
import { StyledSideButton, YellowStarIcon } from "./StyledComponents";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import {AuthenticationContext} from "../auth";

const UserBarDiv = styled.div`
  background: E5E5E5;
  color: white;
  grid-area: user;
  display: flex;
  flex-direction: column;
`;

export function UserBar(props) {
    const authContext = useContext(AuthenticationContext);
    const history = useHistory();
    return (
        <UserBarDiv>
            <StyledSideButton
                variant="contained"
                color="secondary"
                startIcon={<AccountCircleIcon style={{fontSize: 50}}/>}
                onClick={() => {
                    authContext.setToken(undefined);
                    history.push("/search");
                }}
            />
            <StyledSideButton
                variant="contained"
                color="secondary"
                startIcon={<YellowStarIcon style={{fontSize: 50}}/>}
                onClick={() => history.push("/favourite")}
            />
        </UserBarDiv>
    );
}
