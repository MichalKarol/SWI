import React from "react";
import "date-fns";
import withStyles from "@material-ui/core/styles/withStyles";
import {Button, InputBase} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {ExpandMore, Star} from "@material-ui/icons";
import StarIcon from '@material-ui/icons/Star';

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