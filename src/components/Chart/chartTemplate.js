import React from "react";
import { CXContext } from "./cxContext";
import * as dc from "dc";
// import { rhythm } from "../utils/typography";
// import { css } from "glamor";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
// // styles
// import useStyles from "./styles";
// import styles from './style.less';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    width: "100%",
    height: "100%",   
  },
  // header: {
  //   paddingLeft: 16,
  //   paddingRight: 16,
  //   paddingTop: 8,
  //   paddingBottom: 8,
  // },
  action: {
    marginTop: 0,
  }  
}));

export const ChartTemplate = (props) => {
  const classes = useStyles();
  /*
    We render the dc chart using an effect. We want to pass the chart as a prop after the dc call,
    but there is nothing by default to trigger a re-render and the prop, by default would be undefined.
    To solve this, we hold a state key and increment it after the effect ran. 
    By passing the key to the parent div, we get a rerender once the chart is defined. 
    */
  const context = React.useContext(CXContext);
  const [chart, updateChart] = React.useState(null);
  const ndx = context.ndx;
  const div = React.useRef(null);
  React.useEffect(() => {
    let newChart = props.chartFunction(div.current, ndx); // chartfunction takes the ref and does something with it

    newChart.render();
    updateChart(newChart);
  }, 1);
  {
    /*Run this exactly once */
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton
            aria-label="refresh"
            onClick={() => {
              chart.filterAll();
              dc.redrawAll();
            }}
          >
            <RefreshIcon />
          </IconButton>
        }
        title={props.title}
      />
      <CardContent>
        <div ref={div} class={props.chartType} />
      </CardContent>
    </Card>
    // <div ref={div} class={props.chartType} />
  );
};
