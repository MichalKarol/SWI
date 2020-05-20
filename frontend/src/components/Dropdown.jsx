import React, { useState } from "react";
import {
  Select,
  MenuItem,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";

const WhiteExpandMoreIcon = withStyles({
  root: {
    color: "#FFFFFF !important",
  },
})(ExpandMore);

export function Dropdown(props) {
  const [value, setValue] = useState(
    props.value || props.values.length > 0 ? props.values[0].value : ""
  );
  console.log(props.value, value);
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
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
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
    fontStyle: "normal",
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    padding: "auto 0",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
})(Dropdown);

export const StyledSortDropdown = withStyles({
  root: {
    borderRadius: "0.5em !important",
    backgroundColor: "#606060 !important",
    color: "#ffffff",
    textIndent: "0.5em",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
})(Dropdown);