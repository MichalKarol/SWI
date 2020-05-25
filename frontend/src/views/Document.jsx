import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { IconButton, Typography } from "@material-ui/core";
import { SearchContext, generateQueryParams } from "../search";
import {
    CenteredTypography,
    StyledBackButton,
    StyledElementButton,
    YellowStarIcon,
} from "../components/StyledComponents";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useAuthenticatedIO } from "../authenticated-io";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const DocumentDiv = styled.div`
  display: grid;
  grid-template-columns: 70fr 30fr;
  grid-template-rows: auto;
  grid-template-areas: "text info";
  margin-right: 128px;
`;

const TextDiv = styled.div`
  grid-area: text;
  background: E5E5E5;
  margin-top: 16px;
`;

const InfoDiv = styled.div`
  background: E5E5E5;
  grid-area: info;
  display: flex;
  flex-direction: column;
`;

export function Document(props) {
  const history = useHistory();
  const searchContext = useContext(SearchContext);
  const [result, setResult] = useState();
  const io = useAuthenticatedIO();

  useEffect(() => {
    if (!result) {
      setResult("loading");
      io.getDocuments([props.id]).then((result) => setResult(result.docs[0]));
    }
  }, [result]);

  if (!result || result === "loading") return null;

  return (
      <DocumentDiv>
        <TextDiv>
          <Typography variant="h3">
            {result.title}
            <IconButton
                onClick={() => {
                  setResult((s) => {
                    const newState = {...s};
                    newState.isFavourite = !newState.isFavourite;
                    io.changeFavourite(result.id);
                    return newState;
                  });
                }}
            >
              {result.isFavourite ? (
                  <YellowStarIcon fontSize="large"/>
              ) : (
                  <StarBorderIcon fontSize="large"/>
              )}
            </IconButton>
          </Typography>

          <Typography>{result.contents}</Typography>
        </TextDiv>
        <InfoDiv>
          <StyledBackButton
              variant="contained"
              color="secondary"
              startIcon={<ArrowBackIcon/>}
              onClick={() => {
                history.push(`/search?${generateQueryParams(searchContext.state)}`);
              }}
          >
            Back to search results
          </StyledBackButton>

          {result.components?.length > 0 && (
              <CenteredTypography variant="h5">Components</CenteredTypography>
          )}
          {result.components?.map((el) => (
              <StyledElementButton
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    searchContext.setState(() => ({
                      query: "",
                      field: "*",
                      sort: " ",
                      topics: [],
                      components: [el],
                      dateTo: null,
                      dateFrom: null,
                    }));
                    history.push(
                        `/search?${generateQueryParams(searchContext.state)}`
                    );
                  }}
              >
                {el}
              </StyledElementButton>
          ))}

          {result.topics?.length > 0 && (
              <CenteredTypography variant="h5">Topics</CenteredTypography>
          )}
          {result.topics?.map((el) => (
              <StyledElementButton
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    searchContext.setState(() => ({
                      query: "",
                      field: "*",
                      sort: " ",
                      topics: [el],
                      components: [],
                      dateTo: null,
                      dateFrom: null,
                    }));
                    history.push(
                        `/search?${generateQueryParams(searchContext.state)}`
                    );
                  }}
              >
                {el}
              </StyledElementButton>
          ))}
        </InfoDiv>
      </DocumentDiv>
  );
}
