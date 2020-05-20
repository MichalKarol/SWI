import React from "react";
import styled from "styled-components";
import {StyledSideButton} from "./StyledComponents";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {FavoriteOutlined} from "@material-ui/icons";

export function UserBar(props) {
  const UserBarDiv = styled.div`
    background: E5E5E5;
    color: white;
    grid-area: user;
  `;
  return (
      <UserBarDiv>
        <StyledSideButton
            variant="contained"
            color="secondary"
            startIcon={
                <AccountCircleIcon
                    style={{ fontSize: 50 }}
                />
            }
        />
        <StyledSideButton
            variant="contained"
            color="secondary"
            startIcon={
                <FavoriteOutlined
                    style={{ fontSize: 50 }}
                />
            }
        />
      </UserBarDiv>
  );
}
