import React, { useState } from "react";
import { Row, Col } from "react-flexbox-grid";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import { DataContext } from "../../components/Chart/cxContext";
import { CloudPieChart } from "../../components/Chart/cloudPieChart";

import { CloudLabelChart } from "../../components/Chart/cloudLabelChart";
import { CloudContentTable } from "../../components/Chart/cloudContentTable";
import { WordCloudChart } from "../../components/Chart/wordCloudChart";
import { CloudSearchWidget } from "../../components/Chart/cloudSearchWidget";
import { CloudMonthlyBarChart } from "../../components/Chart/cloudMonthlyBarChart";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function CloudDashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [mainChartState, setMainChartState] = useState("monthly");
  const [startdDate, setStartDate] = React.useState(
    new Date("2014-08-18T21:11:54"),
  );
  const [endDate, setEndDate] = React.useState(new Date("2014-08-18T21:11:54"));

  return (
    <>
      {/* <PageTitle title="Cloud Analytics" button={<Button
      variant="contained"
      size="medium"
      color="secondary"
    >
        Latest Reports
    </Button>} /> */}
      <Row>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Start Date"
                  value={startdDate}
                  // onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="End Date"
                  format="MM/dd/yyyy"
                  // value={selectedDate}
                  onChange={endDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classes.button}
                  endIcon={<CloudUploadIcon />}
                >
                  Send
                </Button>
            </MuiPickersUtilsProvider>
          </CardContent>
        </Card>
      </Row>
      <DataContext>
        <Row>
          <Col md={8}>
            <Row className={classes.row}>
              <Col md={4}>
                <CloudPieChart />
              </Col>
              <Col md={8}>
                <CloudLabelChart />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <WordCloudChart />
              </Col>
              <Col md={6}>
                <CloudMonthlyBarChart />
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col md={12}>
                <form style={{ marginBottom: "5px" }}>
                  <CloudSearchWidget />
                </form>
              </Col>
              <Col md={12}>
                <div class="float-right">
                  <span id="begin"></span>-<span id="end"></span> of{" "}
                  <span id="size"></span> <span id="totalsize"></span>
                  <button id="last" class="btn btn-secondary btn-sm">
                    Previous
                  </button>
                  <button id="next" class="btn btn-secondary btn-sm">
                    Next
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <CloudContentTable />
              </Col>
            </Row>
          </Col>
        </Row>
      </DataContext>
    </>
  );
}

// #######################################################################
