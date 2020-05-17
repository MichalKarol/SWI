import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import styled from "styled-components";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";

const StyledPaper = withStyles({
  root: {
      borderRadius: 0,
  }
})(Paper);

const StyledSearchButton = withStyles({
    root: {
        borderRadius: '0 1em 0 0',
    }
})(Button);

const StyledSearchSelect = withStyles({
    root: {
        borderRadius: '1em 0 0 0 !important',
        backgroundColor: "#606060 !important",
        color: '#ffffff',
        textIndent: '1em'
    }
})(Select);

const StyledSortSelect = withStyles({
    root: {
        borderRadius: '0.5em !important',
        backgroundColor: "#606060 !important",
        color: '#ffffff',
        textIndent: '0.5em',
    }
})(Select);

const ContainerDiv = styled.div`
   display: flex;
   justify-content: start;
`;

const CheckboxContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   height: auto;
`;

const SearchContainer = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   height: auto;
`;

const LimitText = styled.span`
    color: black
`;

const theme = createMuiTheme({
        palette: {
        primary: {
            main: "#606060"
        },
        secondary: {
            main: "#584DDE"
        }}
});

const WhiteExpandMoreIcon = withStyles({
    root: {
        color: '#FFFFFF !important',
    }
})(ExpandMoreIcon);

const Panel = withStyles({
    root: {
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        backgroundColor: "#E5E5E5",
        width: "300px"
    },
    expanded: {},
})(ExpansionPanel);

const PanelSummary = withStyles({
    root: {
        backgroundColor: "#606060",
        color: '#ffffff',
        borderRadius: "0.5em 0 0.5em 0"
    },
    expanded: {},
})(ExpansionPanelSummary);

const PanelDetails = withStyles({
    root: {
        backgroundColor: "#ffffff",
        borderRadius: '0 0 0 0.5em',
        boxShadow: "2px 2px #606060",
    },
})(ExpansionPanelDetails);

export function Search() {

    return (
        <MuiThemeProvider theme={theme}>
            <SearchContainer>
                <StyledSearchSelect
                    IconComponent={WhiteExpandMoreIcon}
                    MenuProps={{
                        getContentAnchorEl: null,
                        anchorOrigin: {
                            vertical: "bottom",
                        }
                    }}
                    defaultValue='All'
                    displayEmpty='All fields'
                    disableUnderline
                    // onChange={handleChange}
                >
                    <MenuItem value='All'>All fields</MenuItem>
                    <MenuItem value='Title'>Title</MenuItem>
                    <MenuItem value='Content'>Content</MenuItem>
                </StyledSearchSelect>
                <StyledPaper component="form">
                    <InputBase
                        placeholder="Type to search"
                    />
                </StyledPaper>
                <StyledSearchButton
                    variant="contained"
                    color="secondary"
                    // className={classes.button}
                    endIcon={<SearchIcon/>}
                >
                    Search
                </StyledSearchButton>
            </SearchContainer>
            <div>
                <LimitText>
                    Limit your search:
                </LimitText>
                <StyledSortSelect
                    IconComponent={WhiteExpandMoreIcon}
                    MenuProps={{
                        getContentAnchorEl: null,
                        anchorOrigin: {
                            vertical: "bottom",
                        }
                    }}
                    defaultValue='relevance'
                    displayEmpty='Sort by relevance'
                    disableUnderline
                >
                    <MenuItem value='relevance'>Sort by relevance</MenuItem>
                    <MenuItem value='title'>Sort by title</MenuItem>
                    <MenuItem value='asc'>Sort from newest</MenuItem>
                    <MenuItem value='desc'>Sort from oldest</MenuItem>
                </StyledSortSelect>

                <ContainerDiv>
                    <Panel square>
                        <PanelSummary
                            expandIcon={<WhiteExpandMoreIcon/>}
                        >
                            <div>
                                <Typography>Components</Typography>
                            </div>
                        </PanelSummary>
                        <PanelDetails>
                            <CheckboxContainer>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="secondary"
                                        />
                                    }
                                    label="Environment"
                                />
                                <Divider/>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="secondary"
                                        />
                                    }
                                    label="Civil Rights"
                                />
                            </CheckboxContainer>
                        </PanelDetails>
                    </Panel>
                </ContainerDiv>
            </div>
        </MuiThemeProvider>
    );

}
