import React, { useState } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";

const WhiteExpandMoreIcon = withStyles({
  root: {
    color: "#FFFFFF !important",
    marginRight: "32px"
  },
})(ExpandMore);

export function Dropdown(props) {
  return (
    <Select
      IconComponent={WhiteExpandMoreIcon}
      MenuProps={{
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: "bottom",
        },
      }}
      disableUnderline
      displayEmpty={props.values.length === 0}
      {...props}
    >
      {props.values.map((el, idx) => (
        <MenuItem value={el.value} key={idx}>
          {el.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export const StyledFieldDropdown = withStyles({
  root: {
    borderRadius: "1em 0 0 0 !important",
    backgroundColor: "#606060 !important",
    color: "#ffffff",
    textIndent: "0.5em",
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    width: "275px",
  },
})(Dropdown);

export const StyledSortDropdown = withStyles({
  root: {
    borderRadius: "0.5em !important",
    backgroundColor: "#606060 !important",
    color: "#ffffff",
    textIndent: "0.5em",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    width: "200px",
    textAlign: "center"
  },
})(Dropdown);
