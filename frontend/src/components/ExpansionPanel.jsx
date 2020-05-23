import React, { useState } from "react";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import styled from "styled-components";
import {PivotDiv, StyledBackButton, SelectedFacetContainer, WhiteBackIcon, WhiteExpandMoreIcon} from "./StyledComponents";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {generateQueryParams} from "../search";

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;
  width: 100%;
`;

const Panel = withStyles({
  root: {
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    backgroundColor: "#E5E5E5",
    width: "300px",
    marginBottom: "16px",
  },
  expanded: {},
})(ExpansionPanel);

const PanelSummary = withStyles({
  root: {
    backgroundColor: "#606060",
    color: "#ffffff",
    // borderRadius: "0.5em 0 0.5em 0",
    // borderRadius: props.radius,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  expanded: {},
})(ExpansionPanelSummary);

// const PanelSummary = withStyles(summaryStyles)(ExpansionPanelSummary);

const PanelDetails = withStyles({
  root: {
      backgroundColor: "#ffffff",
      borderRadius: "0 0 0 0.5em",
      overflowY: "scroll",
      maxHeight: "250px",
      paddingTop: "4px",
      overflowX: "hidden",
  },
})(ExpansionPanelDetails);

export function ExpandingMultiSelectDropdown(props) {
  const [value, setValue] = useState(
      props.values.length > 0 ? props.values[0].value : {}
  );
  const [summaryRadius, setSummaryRadius] = useState("0.5em 0 0.5em 0");
  const [panelRadius, setPanelRadius] = useState("0.5em 0 0.5em 0");
  return (
      <Panel
          square
          style={{borderRadius: panelRadius}}
          onChange={(event, expanded) => {
            if (expanded === true) {
              setSummaryRadius("0.5em 0 0 0");
              setPanelRadius("0.5em 0 0 0.5em");
            } else {
              setSummaryRadius("0.5em 0 0.5em 0");
              setPanelRadius("0.5em 0 0.5em 0");
            }
          }}
      >
        <PanelSummary
            expandIcon={<WhiteExpandMoreIcon/>}
            style={{borderRadius: summaryRadius}}
        >
          <Typography>{props.title}</Typography>
          <Typography>{props.tooltip}</Typography>
        </PanelSummary>
        <PanelDetails>
          <CheckboxContainer>
            {props.values.map((el, idx) => (
                <div key={idx}>
                  <FormControlLabel
                      control={<Checkbox color="secondary"/>}
                      value={el.value}
                      label={el.label}
                  />
                  {idx !== props.values.length - 1 && <Divider/>}
                </div>
            ))}
          </CheckboxContainer>
        </PanelDetails>
      </Panel>
  );
}

export function ExpandingSingleSelectDropdown(props) {
  // const [value, setValue] = useState(
  //     props.values.length > 0 ? props.values[0].value : {}
  // );
  const [selectedFacet, setSelectedFacet] = useState(undefined);
  const [summaryRadius, setSummaryRadius] = useState("0.5em 0 0.5em 0");
  const [panelRadius, setPanelRadius] = useState("0.5em 0 0.5em 0");

  function renderContent(props) {
    if (selectedFacet === 'component') {
      return (
          <PivotDiv>
            <SelectedFacetContainer
                onClick={() => {
                  setSelectedFacet(undefined);
                }}
            > Component <WhiteBackIcon/>
            </SelectedFacetContainer>
            <CheckboxContainer>
              {props.components.map((el, idx) => (
                  <div key={idx}>
                    <FormControlLabel
                        control={<Checkbox color="secondary"/>}
                        value={el.value}
                        label={el.label}
                    />
                    {idx !== props.components.length - 1 && <Divider/>}
                  </div>
              ))}
            </CheckboxContainer>
          </PivotDiv>
      )
    } else if (selectedFacet === 'topic') {
      return (
          <PivotDiv>
            <SelectedFacetContainer
                onClick={() => {
                  setSelectedFacet(undefined);
                }}
            > Topic <WhiteBackIcon/>
            </SelectedFacetContainer>
            <CheckboxContainer>
              {props.topics.map((el, idx) => (
                  <div key={idx}>
                    <FormControlLabel
                        control={<Checkbox color="secondary"/>}
                        value={el.value}
                        label={el.label}
                    />
                    {idx !== props.topics.length - 1 && <Divider/>}
                  </div>
              ))}
            </CheckboxContainer>
          </PivotDiv>)
    } else {
      return (<PivotDiv>
        <Button
            onClick={() =>
                setSelectedFacet("component")
            }
        >Component</Button>
        <Divider/>
        <Button
            onClick={() =>
                setSelectedFacet("topic")
            }
        >Topic</Button>
      </PivotDiv>)
    }
  }

  return (
      <Panel
          square
          style={{borderRadius: panelRadius}}
          onChange={(event, expanded) => {
            if (expanded === true) {
              setSummaryRadius("0.5em 0 0 0");
              setPanelRadius("0.5em 0 0 0.5em");
            } else {
              setSummaryRadius("0.5em 0 0.5em 0");
              setPanelRadius("0.5em 0 0.5em 0");
            }
          }}
      >
        <PanelSummary
            expandIcon={<WhiteExpandMoreIcon/>}
            style={{borderRadius: summaryRadius}}
        >
          <Typography>{props.title}</Typography>
          <Typography>{props.tooltip}</Typography>
        </PanelSummary>
        <PanelDetails>
          {renderContent(props)}
          {/*<CheckboxContainer>*/}
          {/*  {props.values.map((el, idx) => (*/}
          {/*      <div key={idx}>*/}
          {/*        <FormControlLabel*/}
          {/*            control={<Checkbox color="secondary"/>}*/}
          {/*            value={el.value}*/}
          {/*            label={el.label}*/}
          {/*        />*/}
          {/*        {idx !== props.values.length - 1 && <Divider/>}*/}
          {/*      </div>*/}
          {/*  ))}*/}
          {/*</CheckboxContainer>*/}
        </PanelDetails>
      </Panel>
  );
}
