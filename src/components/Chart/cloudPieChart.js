import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";
const gainOrLossChartFunc = (divRef, ndx) => {
  // const dimension = ndx.dimension((d) => (d.open > d.close ? "Loss" : "Gain"));
  const dimension = ndx.dimension((d) => (d.sentiment));
  const group = dimension.group();
  const all = ndx.groupAll();

  const gainOrLossChart = dc.pieChart(divRef);
  gainOrLossChart
    .dimension(dimension)
    .group(group)
    .label(function (d) {
      let label;
      if(d.key.toUpperCase() === "POSITIVE") {
        label = "お褒め";
      } else if (d.key.toUpperCase() === "NEGATIVE") {
        label = "ご不満";
      } else {
        label = "普通";
      }
      if (all.value()) {
        // label += ` - ${d.value} - ${(d.value / (all.value() as number) * 100).toFixed(1)}%`;
        label += ` - ${d.value}`;
      }
      return label;
    })
    .renderLabel(true)
    .innerRadius(15)
    .transitionDuration(500)
    // .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
    // .colorDomain([-1750, 1644])
    .colorAccessor((d) => d.value);
  return gainOrLossChart;
};

export const CloudPieChart = (props) => (
  <ChartTemplate chartFunction={gainOrLossChartFunc} title="評価" chartType="chart-type-pie" />
);
