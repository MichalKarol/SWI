import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { SearchContext, generateQueryParams } from "../search";

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
    background: grey;
  `;

  const InfoDiv = styled.div`
    background: yellow;
    grid-area: info;
  `;

  return (
    <DocumentDiv>
      <TextDiv>DOCUMENT {props.id}</TextDiv>
      <InfoDiv>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push(`/search?${generateQueryParams(searchContext.state)}`);
          }}
        >
          Back to search results
        </Button>
        components Topics
      </InfoDiv>
    </DocumentDiv>
  );
}
