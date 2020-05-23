import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {IconButton, Typography} from "@material-ui/core";
import { SearchContext, generateQueryParams } from "../search";
import {
  StyledBackButton,
  StyledElementButton,
  YellowStarIcon,
} from "../components/StyledComponents";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useAuthenticatedIO } from "../authenticated-io";
import withStyles from "@material-ui/core/styles/withStyles";
import StarBorderIcon from "@material-ui/icons/StarBorder";

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

export function Document(props) {
  const history = useHistory();
  const searchContext = useContext(SearchContext);
  const [result, setResult] = useState();
  const io = useAuthenticatedIO("FIXMETOKEN");

  useEffect(() => {
    if (!result) {
      setResult("loading");
      io.getDocuments([props.id]).then((result) => setResult(result.docs[0]));
    }
  }, [result]);

  const CenteredTypography = withStyles({
    root: {
      "text-align": "center",
    },
  })(Typography);

  if (!result || result === "loading") return null;

  return (
      <DocumentDiv>
        <TextDiv>
          <Typography variant="h3">
            {result.title}
            TODO PLEASE UNCOMMENT AND CHECK WITH DATA
            <IconButton
                // onClick={
                //   () => {
                //     io.changeFavourite(result.id).then(() => {
                //           const currentResult = result
                //           currentResult.isFavourite = !currentResult.isFavourite
                //           setResult(currentResult)
                //         }
                //     )
                //   }
                // }
            >
              {result.isFavourite ? (
                  <YellowStarIcon fontSize="large"/>
              ) : (
                  <StarBorderIcon fontSize="large"/>
              )}
            </IconButton>
            {result.isFavourite && <YellowStarIcon/>}
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

          <CenteredTypography variant="h5">Components</CenteredTypography>

          {/*TODO CHECK*/}

          {result.components.map((el) => (
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
                      dateTo: "*",
                      dateFrom: "*"
                    }))
                    history.push(`/search?${generateQueryParams(searchContext.state)}`);
                  }}
              >
                {el}
              </StyledElementButton>
          ))}

          {/*TODO UNCOMMENT TOPICS*/}

          {/* <StyledElementButton variant="contained" color="primary">
          Topics
        </StyledElementButton>
        <Typography color="textPrimary">{result.components.map((el) => (
            <>{el}</>
          ))}</Typography> */}
        </InfoDiv>
      </DocumentDiv>
  );
}
