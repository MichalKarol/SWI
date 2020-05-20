import React from "react";
import styled from "styled-components";
import {StyledSideButton, YellowStarIcon} from "./StyledComponents";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export function UserBar(props) {
    const UserBarDiv = styled.div`
        background: E5E5E5;
        color: white;
        grid-area: user;
        display: flex;
        flex-direction: column;
  `;
    return (
        <UserBarDiv>
            <StyledSideButton
                variant="contained"
                color="secondary"
                startIcon={
                    <AccountCircleIcon
                        style={{fontSize: 50}}
                    />
                }
            />
            <StyledSideButton
                variant="contained"
                color="secondary"
                startIcon={
                    <YellowStarIcon
                        style={{fontSize: 50}}
                    />
                }
            />
        </UserBarDiv>
    );
}
