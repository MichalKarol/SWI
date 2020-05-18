import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import styled from "styled-components";

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

export const StyledDropdown = withStyles({
  root: {
    borderRadius: "1em 0 0 0 !important",
    backgroundColor: "#606060 !important",
    color: "#ffffff",
    textIndent: "1em",
    fontStyle: "normal",
    fontSize: "24px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
})(Dropdown);

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;
`;

// const Panel = withStyles({
//   root: {
//     "&:not(:last-child)": {
//       borderBottom: 0,
//     },
//     "&:before": {
//       display: "none",
//     },
//     borderRadius: "0.5em 0 0.5em 0",
//     boxShadow:
//       "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//     backgroundColor: "#E5E5E5",
//     width: "300px",
//   },
//   expanded: {},
// })(ExpansionPanel);

// const PanelSummary = withStyles({
//   root: {
//     backgroundColor: "#606060",
//     color: "#ffffff",
//     borderRadius: "0.5em 0 0.5em 0",
//     boxShadow:
//       "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//   },
//   expanded: {},
// })(ExpansionPanelSummary);

// const PanelDetails = withStyles({
//   root: {
//     backgroundColor: "#ffffff",
//     borderRadius: "0 0 0 0.5em",
//   },
// })(ExpansionPanelDetails);

export function ExpandingMultiSelectDropdown(props) {
  const [value, setValue] = useState(
    props.values.length > 0 ? props.values[0].value : {}
  );
  return (
    <ExpansionPanel square>
      <ExpansionPanelSummary expandIcon={<WhiteExpandMoreIcon />}>
        <Typography>{props.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <CheckboxContainer>
          {props.values.map((el, idx) => (
            <div key={idx}>
              <FormControlLabel
                control={<Checkbox color="secondary" />}
                value={el.value}
                label={el.label}
              />
              {idx !== props.values.length - 1 && <Divider />}
            </div>
          ))}
        </CheckboxContainer>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
