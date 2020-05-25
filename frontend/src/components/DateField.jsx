import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import withStyles from "@material-ui/core/styles/withStyles";
import {StyledTodayIcon} from "./StyledComponents";

const StyledUpperDate = withStyles({
    root: {
        backgroundColor: "#606060",
        borderRadius: "0.5em 0 0 0",
        alignItems: "center",
        boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        padding: "4px 0 4px 0",
    },
})(KeyboardDatePicker);

const StyledLowerDate = withStyles({
    root: {
        backgroundColor: "#606060",
        borderRadius: "0 0 0.5em 0",
        alignItems: "center",
        boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        padding: "4px 0 4px 0",
    },
})(KeyboardDatePicker);

export function UpperDateField(props) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <StyledUpperDate
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onDateChange}
                InputProps={{
                    disableUnderline: true,
                    style: {color: "#fff"},
                }}
                keyboardIcon={<StyledTodayIcon/>}
            />
        </MuiPickersUtilsProvider>
    );
}

export function LowerDateField(props) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <StyledLowerDate
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onDateChange}
                InputProps={{
                    disableUnderline: true,
                    style: {color: "#fff"},
                }}
                keyboardIcon={<StyledTodayIcon/>}
            />
        </MuiPickersUtilsProvider>
    );
}
