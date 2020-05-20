import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Typography} from "@material-ui/core";
import { SearchContext, generateQueryParams } from "../search";
import {StyledBackButton, StyledElementButton} from "../components/StyledComponents";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export function Document(props) {
  const history = useHistory();
  const searchContext = useContext(SearchContext);

  const DocumentDiv = styled.div`
    display: grid;
    grid-template-columns: 70fr 30fr;
    grid-template-rows: auto;
    grid-template-areas: "text info";
  `;

  const TextDiv = styled.div`
    grid-area: text;
    background: E5E5E5;
  `;

  const InfoDiv = styled.div`
    background: E5E5E5;
    grid-area: info;
    display: flex;
    flex-direction: column;
  `;

  return (
    <DocumentDiv>
      <TextDiv>DOCUMENT {props.id}</TextDiv>
      <InfoDiv>
        <StyledBackButton
          variant="contained"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            history.push(`/search?${generateQueryParams(searchContext.state)}`);
          }}
        >
          Back to search results
        </StyledBackButton>
        <Typography color="textPrimary">
          Components
        </Typography>
        <StyledElementButton
          variant="contained"
          color="primary"
        >
          Component
        </StyledElementButton>
        <Typography color="textPrimary">
          Topics
        </Typography>
        <StyledElementButton
          variant="contained"
          color="primary"
        >
          Topic
        </StyledElementButton>
      </InfoDiv>
    </DocumentDiv>
  );
}
