import React, {useState} from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import withStyles from "@material-ui/core/styles/withStyles";
import styled from "styled-components";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import TodayIcon from '@material-ui/icons/Today';import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const StyledUpperKeyboardDatePicker = withStyles({
    root: {
        backgroundColor: "#606060",
        borderRadius: "0.5em 0 0 0",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
})(KeyboardDatePicker);

const StyledLowerKeyboardDatePicker = withStyles({
    root: {
        backgroundColor: "#606060",
        borderRadius: "0 0 0.5em 0",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
})(KeyboardDatePicker);

const StyledDivider = withStyles({
  root: {
      color: '#fff'
  }
})(Divider);


const StyledCard = withStyles({
  root: {
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      width: '400px'
  }
})(Card);

const StyledSearchButton = withStyles({
    root: {
        borderRadius: '0 1em 0 0',
        fontStyle: 'normal',
        fontSize: '24px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }
})(Button);

const StyledMoreButton = withStyles({
    root: {
        borderRadius: '0 1em 1em 0',
        fontStyle: 'normal',
        fontSize: '24px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }
})(Button);

const StyledSearchSelect = withStyles({
    root: {
        borderRadius: '1em 0 0 0 !important',
        backgroundColor: "#606060 !important",
        color: '#ffffff',
        textIndent: '1em',
        fontStyle: 'normal',
        fontSize: '24px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }
})(Select);

const StyledInputBase = withStyles({
    root: {
        fontStyle: 'normal',
        fontSize: '24px',
        backgroundColor: '#ffffff',
        textIndent: '1em',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    }
})(InputBase);

const StyledSortSelect = withStyles({
    root: {
        borderRadius: '0.5em !important',
        backgroundColor: "#606060 !important",
        color: '#ffffff',
        textIndent: '0.5em',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
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

const DateContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 200px;
`;

const SearchContainer = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   height: auto;
   width: 100%;
   align-items: stretch;
   height: 5vh;
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
            },
        }
});

const WhiteExpandMoreIcon = withStyles({
    root: {
        color: '#FFFFFF !important',
    }
})(ExpandMoreIcon);

const StyledTodayIcon = withStyles({
    root: {
        color: '#FFFFFF !important',
    }
})(TodayIcon);

const Panel = withStyles({
    root: {
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        borderRadius: "0.5em 0 0.5em 0",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        backgroundColor: "#E5E5E5",
        width: "300px"
    },
    expanded: {},
})(ExpansionPanel);

const PanelSummary = withStyles({
    root: {
        backgroundColor: "#606060",
        color: '#ffffff',
        borderRadius: "0.5em 0 0.5em 0",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    expanded: {},
})(ExpansionPanelSummary);

const PanelDetails = withStyles({
    root: {
        backgroundColor: "#ffffff",
        borderRadius: '0 0 0 0.5em',
    },
})(ExpansionPanelDetails);

export function Search() {
    const [selectedFromDate, setSelectedFromDate] = React.useState(null);
    const [selectedToDate, setSelectedToDate] = React.useState(null);

    const handleDateFromChange = (date) => {
        setSelectedFromDate(date);
    };

    const handleDateToChange = (date) => {
        setSelectedToDate(date);
    };

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
                <StyledInputBase
                    placeholder="Type to search"
                />
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

                <DateContainer>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <StyledUpperKeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            value={selectedFromDate}
                            placeholder="Date from -"
                            onChange={handleDateFromChange}
                            InputProps={{
                                disableUnderline: true,
                                style: {color: '#fff'},
                            }}
                            keyboardIcon={<StyledTodayIcon/>}
                        />
                        <StyledDivider/>
                        <StyledLowerKeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            value={selectedToDate}
                            placeholder="- Date to"
                            onChange={handleDateToChange}
                            InputProps={{
                                disableUnderline: true,
                                style: {color: '#fff'},
                            }}
                            keyboardIcon={<StyledTodayIcon/>}
                        />
                    </MuiPickersUtilsProvider>
                </DateContainer>

                <StyledCard>
                    <CardContent>
                        <Typography color="secondary" gutterBottom>
                            Title
                        </Typography>
                        <Typography>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type...
                        </Typography>
                        <IconButton>
                            <FavoriteBorderOutlinedIcon/>
                        </IconButton>
                        <IconButton>
                            <FavoriteOutlinedIcon/>
                        </IconButton>
                        <StyledMoreButton
                            variant="contained"
                            color="secondary"
                            // className={classes.button}
                        >
                            Show more
                        </StyledMoreButton>
                    </CardContent>

                </StyledCard>
            </div>
        </MuiThemeProvider>
    );

}
