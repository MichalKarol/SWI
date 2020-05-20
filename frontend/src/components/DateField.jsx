import React, { useState } from "react";
import { Today } from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import withStyles from "@material-ui/core/styles/withStyles";

const StyledTodayIcon = withStyles({
  root: {
    color: "#FFFFFF !important",
  },
})(Today);

const StyledUpperDate = withStyles({
    root: {
        backgroundColor: "#606060",
        borderRadius: "0.5em 0 0 0",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
})(KeyboardDatePicker);

const StyledLowerDate = withStyles({
    root: {
        backgroundColor: "#606060",
        borderRadius: "0 0 0.5em 0",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
})(KeyboardDatePicker);

export function UpperDateField(props) {
    const [value, setValue] = useState(null);
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <StyledUpperDate
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                value={value}
                placeholder={props.placeholder}
                onChange={(date) => setValue(date)}
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
    const [value, setValue] = useState(null);
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <StyledLowerDate
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                value={value}
                placeholder={props.placeholder}
                onChange={(date) => setValue(date)}
                InputProps={{
                    disableUnderline: true,
                    style: {color: "#fff"},
                }}
                keyboardIcon={<StyledTodayIcon/>}
            />
        </MuiPickersUtilsProvider>
    );
}
