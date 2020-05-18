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

export function DateField(props) {
  const [value, setValue] = useState(undefined);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        value={value}
        placeholder={props.palceholder}
        onChange={(date) => setValue(date)}
        InputProps={{
          disableUnderline: true,
          style: { color: "#fff" },
        }}
        keyboardIcon={<StyledTodayIcon />}
      />
    </MuiPickersUtilsProvider>
  );
}
