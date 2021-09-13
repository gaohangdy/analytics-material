import React, { useState, useRef } from "react";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components
import GridLayout from "react-grid-layout";
import PageTitle from "../../../components/PageTitle";
import { DataContext } from "../../../components/Chart/cxContext";
import { CloudPieChart } from "../../../components/Chart/cloudPieChart";

import { CloudLabelChart } from "../../../components/Chart/cloudLabelChart";
import { CloudContentTable } from "../../../components/Chart/cloudContentTable";
import { WordCloudChart } from "../../../components/Chart/wordCloudChart";
import { CloudSearchWidget } from "../../../components/Chart/cloudSearchWidget";
// import { CloudMonthlyBarChart } from "../../../components/Chart/cloudMonthlyBarChart";
import { CloudLineChart } from "../../../components/Chart/cloudLineChart";

import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import PieIcon from "../../icons/charts/pie";
import TableIcon from "../../icons/charts/table";
import LineIcon from "../../icons/charts/line";
import WordCloudIcon from "../../icons/charts/word";
import BarIcon from "../../icons/charts/bar";

export default function Customer(props) {
  var classes = useStyles();
  var theme = useTheme();

  const searchContext = React.useRef();

  // React.useEffect(() => {
  //   console.log("AAAAAAAA");
  // }, 1);


  // local
  const [startDate, setStartDate] = useState(
    new Date("2021-04-25T00:00:00Z"),
  );
  const [endDate, setEndDate] = useState(
    new Date("2021-07-28T00:00:00Z"),
  );

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
 
  const handleEndDateChange = (date) => {
    setEndDate(date);
  }; 

  const [formats, setFormats] = useState(() => [
    "pie",
    "table",
    "bar",
    "line",
    "word",
  ]);

  const handleFormat = (event, newFormats) => {
    // if (newFormats.length) {
    setFormats(newFormats);

    setShowPie(false);
    setShowLine(false);
    setShowTable(false);
    setShowBar(false);
    setShowWord(false);
    newFormats.forEach((element) => {
      switch (element) {
        case "pie":
          setShowPie(true);
          break;
        case "line":
          setShowLine(true);
          break;
        case "table":
          setShowTable(true);
          break;
        case "bar":
          setShowBar(true);
          break;
        case "word":
          setShowWord(true);
          break;
        default:
          return;
      }
    });
    // }
  };

  const handleSearch = () => {
    console.log("Click Search");
    searchContext.current.queryData(startDate, endDate);
  };

  const [showPie, setShowPie] = useState(true);
  const [showTable, setShowTable] = useState(true);
  const [showLine, setShowLine] = useState(true);
  const [showBar, setShowBar] = useState(true);
  const [showWord, setShowWord] = useState(true);

  const [rowHeight, setRowHeight] = useState(42); // [Grid Layout]
  const [gridWidthDashboard, setGridWidthDashboard] = useState(
    window.innerWidth - 276,
  ); // [Grid Layout]
  // layout is an array of objects, see the demo for more complete usage
  const layout = [
    { i: "pie", x: 0, y: 0, w: 6, h: 6 },
    { i: "bar", x: 6, y: 0, w: 6, h: 6 }, //, minW: 2, maxW: 4
    { i: "word", x: 0, y: 6, w: 12, h: 12 },
    { i: "line", x: 12, y: 6, w: 12, h: 6 },
    { i: "table", x: 12, y: 6, w: 12, h: 12 },
  ];

  const nextPage = (e) => {
    this.child.next();
  };
  const previousPage = (e) => {
    this.child.last();
  };

  return (
    <>
      <PageTitle
        title="顧客の声"
        button={
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div class="search-panel">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-start"
                label="Start Date"
                format="yyyy/MM/dd"
                value={startDate}
                onChange={handleStartDateChange}
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
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <span style={{ width: 12 }}></span>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<SearchIcon />} onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </MuiPickersUtilsProvider>
        }
      />
      <DataContext ref={searchContext}>
        <Grid item sm={12} md={12}>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup
              size="small"
              value={formats}
              onChange={handleFormat}
              aria-label="device"
            >
              <ToggleButton value="pie" aria-label="pie">
                <PieIcon />
              </ToggleButton>
              <ToggleButton value="table" aria-label="table">
                <TableIcon />
              </ToggleButton>
              <ToggleButton value="line" aria-label="line">
                <LineIcon />
              </ToggleButton>
              <ToggleButton value="word" aria-label="word">
                <WordCloudIcon />
              </ToggleButton>
              <ToggleButton value="bar" aria-label="bar">
                <BarIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Grid>

        <GridLayout
          className="layout"
          layout={layout}
          cols={24}
          rowHeight={rowHeight}
          width={gridWidthDashboard}
        >
          {showPie && (
            <div key="pie" data-grid={{ x: 0, y: 0, w: 6, h: 6 }}>
              <CloudPieChart />
            </div>
          )}
          {showBar && (
            <div
              key="bar"
              style={{ display: showBar ? "block" : "none" }}
              data-grid={{ x: 6, y: 0, w: 6, h: 6 }}
            >
              <CloudLabelChart />
            </div>
          )}
          {showWord && (
            <div key="word" data-grid={{ x: 0, y: 6, w: 12, h: 12 }}>
              <WordCloudChart />
            </div>
          )}
          {showLine && (
            <div key="line" data-grid={{ x: 12, y: 6, w: 12, h: 6 }}>
              <CloudLineChart />
            </div>
          )}
          {showTable && (
            <div key="table" data-grid={{ x: 12, y: 6, w: 12, h: 12 }}>
              <form style={{ marginBottom: "5px" }}>
                <CloudSearchWidget />
              </form>

              <div class="float-right">
                <span id="begin"></span>-<span id="end"></span>&nbsp; of&nbsp;{" "}
                <span id="size"></span> <span id="totalsize"></span>
                <button id="last" class="btn btn-secondary btn-sm">
                  Previous
                </button>
                <button id="next" class="btn btn-secondary btn-sm">
                  Next
                </button>
              </div>
              <CloudContentTable />
            </div>
          )}
        </GridLayout>
      </DataContext>
    </>
  );
}

// #######################################################################
