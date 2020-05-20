import React from "react";
import "date-fns";
import withStyles from "@material-ui/core/styles/withStyles";
import {Button} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

export const StyledSearchButton = withStyles({
    root: {
        borderRadius: "0 1em 0 0",
        fontStyle: "normal",
        fontSize: "24px",
        boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
})(Button);

export const StyledElementButton = withStyles({
    root: {
        borderRadius: "0 1em 0 1em",
        fontStyle: "normal",
        fontSize: "24px",
        boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
})(Button);

export const StyledBackButton = withStyles({
    root: {
        borderRadius: "0 1em 0 1em",
        fontStyle: "normal",
        fontSize: "24px",
        boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
})(Button);

export const StyledSideButton = withStyles({
    root: {
        borderRadius: "0 5em 5em 0",
        fontStyle: "normal",
        boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
})(Button);

export const StyledDivider = withStyles({
  root: {
      backgroundColor: 'white',
  }
})(Divider);