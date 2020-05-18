import React from "react";
import styled from "styled-components";

export function UserBar(props) {
  const UserBarDiv = styled.div`
    background: black;
    color: white;
    grid-area: user;
  `;
  return <UserBarDiv>USER</UserBarDiv>;
}
