import { React, useState } from "react";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers/Wrappers";

import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { endOfDay } from "date-fns";

export default function SearchPanel(props) {
  var classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>

      {props.button && props.button}
    </div>
  );
}
