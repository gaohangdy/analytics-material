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
import SearchIcon from '@material-ui/icons/Search';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function CloudDashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  // local
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54"),
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <PageTitle
        title="Cloud Dashboard"
        button={
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div class="search-panel">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-start"
                label="Start Date"
                format="yyyy/MM/dd"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <span style={{ width: 32 }}></span>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-end"
                label="End Date"
                format="yyyy/MM/dd"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <span style={{ width: 12 }}></span>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </div>
          </MuiPickersUtilsProvider>
          // <Button variant="contained" size="medium" color="secondary">
          //   Latest Reports
          // </Button>
        }
      />
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
