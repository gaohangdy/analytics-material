import React from "react";
import * as dc from "dc";
import * as d3 from "d3";
import { ChartTemplate } from "./chartTemplate";

const cloudLabelFunc = (divRef, ndx) => {
  const dayOfWeekChart = dc.rowChart(divRef);
  const dimension = ndx.dimension(function (d) {
    // var day = d.dd.getDay();
    // var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // return day + '.' + name[day];
    return d.label_codes;
    // return d.label_code;
  }, true);
  const group = dimension.group();
  dayOfWeekChart
  .width(divRef.parentElement.offsetWidth - 24)
  .height(divRef.parentElement.offsetHeight - 24)
  .dimension(dimension)
  .group(group)
  .colors(d3.scaleOrdinal().range(['#1f77b4','#2ca02c','#ff7f0e']));

  return dayOfWeekChart;
};

export const CloudLabelChart = (props) => (
  <ChartTemplate
    chartFunction={cloudLabelFunc}
    title="ラベル"
    chartType="chart-type-row"
  />
);
