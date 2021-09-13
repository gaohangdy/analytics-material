import React from "react";
import * as dc from "dc";
// import * as d3 from "d3";
import {
  scaleTime,
  timeMonth,
  timeMonths,
  timeWeeks,
  curveCardinal,
  format,
} from "d3";
import { ChartTemplate } from "./chartTemplate";
import { dateFormat, numberFormat } from "./cxContext";

const moveChartFunc = (divRef, ndx) => {
  const dimension = ndx.dimension(function (d) {
    return [+d.ctype, +d.dd];
  });
  const runGroup = dimension.group().reduceCount();
  // runDimension = ndx.dimension(function(d) {return [+d.sentiment, +d.dd]; });
  // const runGroup = dimension.group().reduceSum(function(d) { return +d.Speed; });

  const moveChart = new dc.SeriesChart(divRef);

  moveChart
    .width(divRef.parentElement.offsetWidth - 24)
    .height(divRef.parentElement.offsetHeight - 24)
    .chart(function (c) {
      return new dc.LineChart(c).curve(curveCardinal);
    })
    // .x(d3.scaleLinear().domain([0,20]))
    .x(scaleTime().domain([new Date(2021, 6, 20), new Date(2021, 7, 20)]))
    .round(timeWeeks.round)
    .xUnits(timeWeeks)
    .brushOn(false)
    .yAxisLabel("種別")
    .xAxisLabel("日付")
    .clipPadding(10)
    .elasticY(true)
    .dimension(dimension)
    .group(runGroup)
    .mouseZoomable(true)
    .seriesAccessor(function (d) {
      if (d.key[0] === 0) {
        return "お褒め";
      } else if (d.key[0] === 1) {
        return "ご不満";
      } else {
        return "普通";
      }
      // return "Expt11: " + d.key[0];
    })
    .keyAccessor(function (d) {
      return +d.key[1];
    })
    .valueAccessor(function (d) {
      return +d.value;
    })
    .legend(
      dc
        .legend()
        .x(10)
        .y(moveChart.height() - 13)
        // .itemHeight(13)
        .autoItemWidth(true)
        .gap(5)
        .horizontal(true)
        // .legendWidth(200)
        // .itemWidth(70),
    );
  moveChart.yAxis().tickFormat(function (d) {
    return format(",d")(d);
  });
  // moveChart.margins().left += 40;

  return moveChart;
};

export const CloudLineChart = (props) => (
  <ChartTemplate
    chartFunction={moveChartFunc}
    title="日付別評価"
    chartType="chart-type-line"
  />
);
