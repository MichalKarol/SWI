import React from "react";
import "date-fns";
import withStyles from "@material-ui/core/styles/withStyles";
import {Button, InputBase, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {ExpandMore, Star} from "@material-ui/icons";
import StarIcon from '@material-ui/icons/Star';
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const StyledSearchButton = withStyles({
    root: {
        borderRadius: "0 1em 0 0",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
})(Button);

export const StyledElementButton = withStyles({
    root: {
        borderRadius: "0 1em 0 1em",
        fontStyle: "normal",
        fontSize: "16px",
        margin: "16px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
})(Button);

export const StyledBackButton = withStyles({
    root: {
        margin: "16px",
        borderRadius: "0 1em 0 1em",
        fontStyle: "normal",
        fontSize: "16px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
})(Button);

export const StyledSideButton = withStyles({
    root: {
        borderRadius: "0 5em 5em 0",
        fontStyle: "normal",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        margin: "8px",
    },
})(Button);

export const StyledDivider = withStyles({
  root: {
      backgroundColor: 'white',
  }
})(Divider);


export const StyledInputBase = withStyles({
    root: {
        fontStyle: 'normal',
        fontSize: '24px',
        backgroundColor: '#ffffff',
        textIndent: '1em',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    }
})(InputBase);

export const StyledMoreButton = withStyles({
    root: {
        borderRadius: "0 1em 1em 0",
        fontStyle: "normal",
        fontSize: "16px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
})(Button);

export const WhiteExpandMoreIcon = withStyles({
  root: {
    color: "#FFFFFF !important",
  },
})(ExpandMore);

export const YellowStarIcon = withStyles({
  root: {
    color: "gold !important",
  },
})(Star);

export const WhiteBackIcon = withStyles({
  root: {
    color: "white !important",
  },
})(ArrowBackIcon);

export const StyledTypography = withStyles({
  root: {
      color: "textPrimary",
      fontSize: "24px",
      marginBottom: "16px",
      },
})(Typography);

export const SelectedFacetContainer = styled.div`
  background-color: black;
  width: 120%;
  margin: -4px -16px 0 -16px;
  color: white;
  font-size: large;
  padding: 4px;
  text-align: center;
`;

export const FavouritesDiv = styled.div`
  display: grid;
  grid-template-rows: 10fr 90fr;
  grid-template-areas:
    "info"
    "cards";
`;

export const InfoDiv = styled.div`
  background: E5E5E5;
  grid-area: info;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 64px;
  margin-right: 128px;
`;

export const PivotDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CardsDiv = styled.div`
  background: E5E5E5;
  grid-area: cards;
`;

export const SearchDiv = styled.div`
  display: grid;
  grid-template-columns: 18fr 82fr;
  grid-template-rows: auto;
  grid-template-areas: "filters results";
`;

export const FiltersDiv = styled.div`
  background: E5E5E5;
  grid-area: filters;
`;

export const ResultsDiv = styled.div`
  grid-area: results;
  display: grid;
  grid-template-rows: 10fr 90fr;
  grid-template-areas:
    "info"
    "cards";
`;

export const CalendarDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DividerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;