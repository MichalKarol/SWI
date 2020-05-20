import React from "react";
import {
  IconButton,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {StyledMoreButton, YellowStarIcon} from "./StyledComponents";
import styled from "styled-components";
import StarBorderIcon from '@material-ui/icons/StarBorder';

export function ResultCard(props) {
  const StyledCard = withStyles({
    root: {
      margin: "16px",
      width: "auto",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  })(Card);

  const ContentDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    `;

  return (
      <StyledCard>
        <CardContent>
          <Typography color="secondary" gutterBottom>
            {props.title}
          </Typography>
          <ContentDiv>
            <Typography>{props.description}</Typography>
            <IconButton onClick={props.onFavouriteClick}>
              {props.isFavourite ? (
                  <YellowStarIcon
                      fontSize="large"
                  />
              ) : (
                  <StarBorderIcon
                      fontSize="large"
                  />
              )}
            </IconButton>
            <StyledMoreButton
                variant="contained"
                color="secondary"
                onClick={props.onShowMoreClick}
            >
              Show more
            </StyledMoreButton>
          </ContentDiv>
        </CardContent>
      </StyledCard>
  );
}
