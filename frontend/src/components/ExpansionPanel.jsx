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

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;
`;

const Panel = withStyles({
  root: {
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    borderRadius: "0.5em 0 0.5em 0",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: "#E5E5E5",
    width: "300px",
  },
  expanded: {},
})(ExpansionPanel);

const PanelSummary = withStyles({
  root: {
    backgroundColor: "#606060",
    color: "#ffffff",
    borderRadius: "0.5em 0 0.5em 0",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  expanded: {},
})(ExpansionPanelSummary);

const PanelDetails = withStyles({
  root: {
    backgroundColor: "#ffffff",
    borderRadius: "0 0 0 0.5em",
  },
})(ExpansionPanelDetails);

export function ExpandingMultiSelectDropdown(props) {
  const [value, setValue] = useState(
    props.values.length > 0 ? props.values[0].value : {}
  );
  return (
    <Panel square>
      <PanelSummary expandIcon={<WhiteExpandMoreIcon />}>
        <Typography>{props.title}</Typography>
        <Typography>{props.tooltip}</Typography>
      </PanelSummary>
      <PanelDetails>
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
      </PanelDetails>
    </Panel>
  );
}
