import React from "react";
import * as dc from "dc";
import * as d3 from "d3";
import { ChartTemplate } from "./chartTemplate";

const gainOrLossChartFunc = (divRef, ndx) => {
  // const dimension = ndx.dimension((d) => (d.open > d.close ? "Loss" : "Gain"));
  // const dimension = ndx.dimension((d) => (d.sentiment));

  const dimension = ndx.dimension((d) => +d.week);
  // const speedSumGroup = runDimension.group().reduce((p, v) => {
  //     p[v.Expt] = (p[v.Expt] || 0) + v.Speed;
  //     return p;
  // }, (p, v) => {
  //     p[v.Expt] = (p[v.Expt] || 0) - v.Speed;
  //     return p;
  // }, () => ({}));

  const group = dimension.group();
  const all = ndx.groupAll();

  // const gainOrLossChart = dc.pieChart(divRef);
  const gainOrLossChart = new MyBarChart(divRef);

  function sel_stack(i) {
    return (d) => d.value[i];
  }

  gainOrLossChart
    .width(768)
    .height(480)
    .x(d3.scaleLinear().domain([1, 21]))
    .margins({ left: 80, top: 20, right: 10, bottom: 20 })
    .brushOn(false)
    .clipPadding(10)
    .title(function (d) {
      return d.key + "[" + this.layer + "]: " + d.value[this.layer];
    })
    .dimension(dimension)
    .group(group, "1", sel_stack("1"))
    .renderLabel(true);

  for (var i = 2; i < 6; ++i) {
    gainOrLossChart.stack(group, "" + i, sel_stack(i));
  }

  // gainOrLossChart
  //   .dimension(dimension)
  //   .group(group)
  //   .label(function (d) {
  //     let label;
  //     if (d.key.toUpperCase() === "POSITIVE") {
  //       label = "お褒め";
  //     } else if (d.key.toUpperCase() === "NEGATIVE") {
  //       label = "ご不満";
  //     } else {
  //       label = "普通";
  //     }
  //     if (all.value()) {
  //       // label += ` - ${d.value} - ${(d.value / (all.value() as number) * 100).toFixed(1)}%`;
  //       label += ` - ${d.value}`;
  //     }
  //     return label;
  //   })
  //   .renderLabel(true)
  //   .innerRadius(15)
  //   .transitionDuration(500)
  //   // .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
  //   // .colorDomain([-1750, 1644])
  //   .colorAccessor((d) => d.value);
  return gainOrLossChart;
};

class MyBarChart extends dc.BarChart {
  legendables() {
    const items = super.legendables();
    return items.reverse();
  }
}

export const CloudMonthlyBarChart = (props) => (
  <ChartTemplate
    chartFunction={gainOrLossChartFunc}
    title="評価"
    chartType="chart-type-pie"
  />
);
