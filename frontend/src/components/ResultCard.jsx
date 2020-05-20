import React from "react";
import {
  Button,
  IconButton,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { FavoriteOutlined, FavoriteBorderOutlined } from "@material-ui/icons";

export function ResultCard(props) {
  const StyledCard = withStyles({
    root: {
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      width: "400px",
    },
  })(Card);

  const StyledMoreButton = withStyles({
    root: {
      borderRadius: "0 1em 1em 0",
      fontStyle: "normal",
      fontSize: "24px",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  })(Button);

  return (
    <StyledCard>
      <CardContent>
        <Typography color="secondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography>{props.description}</Typography>
        <IconButton onClick={props.onFavouriteClick}>
          {props.isFavourite ? (
            <FavoriteBorderOutlined />
          ) : (
            <FavoriteOutlined />
          )}
        </IconButton>
        <StyledMoreButton
          variant="contained"
          color="secondary"
          onClick={props.onShowMoreClick}
        >
          Show more
        </StyledMoreButton>
      </CardContent>
    </StyledCard>
  );
}
