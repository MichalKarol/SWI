import React from "react";
import { IconButton, Typography, Card, CardContent } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { StyledMoreButton, YellowStarIcon } from "./StyledComponents";
import styled from "styled-components";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const ContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export function ResultCard(props) {
  const StyledCard = withStyles({
    root: {
      margin: "16px",
      width: "auto",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  })(Card);

  const ClampedTypography = withStyles({
    root: {
      display: "-webkit-box",
      "-webkit-line-clamp": "3",
      "-webkit-box-orient": "vertical",
      overflow: "hidden",
      "text-overflow": "ellipsis",
    },
  })(Typography);

  return (
    <StyledCard>
      <CardContent>
        <Typography color="secondary" gutterBottom>
          {props.title}
        </Typography>
        <ContentDiv>
          <ClampedTypography style={{ flex: "12" }}>
            {props.contents}
          </ClampedTypography>
          <IconButton
            style={{ flex: "1" }}
            onClick={props.onFavouriteClick}
            type="button"
          >
            {props.isFavourite ? (
              <YellowStarIcon fontSize="large" />
            ) : (
              <StarBorderIcon fontSize="large" />
            )}
          </IconButton>
          <StyledMoreButton
            variant="contained"
            color="secondary"
            onClick={props.onShowMoreClick}
            style={{ flex: "2" }}
          >
            Show more
          </StyledMoreButton>
        </ContentDiv>
      </CardContent>
    </StyledCard>
  );
}
