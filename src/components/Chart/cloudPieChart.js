import React from "react";
import * as dc from "dc";
import * as d3 from "d3";
import { ChartTemplate } from "./chartTemplate";
const gainOrLossChartFunc = (divRef, ndx) => {
  // const dimension = ndx.dimension((d) => (d.open > d.close ? "Loss" : "Gain"));
  const dimension = ndx.dimension((d) => (d.sentiment));
  const group = dimension.group();
  const all = ndx.groupAll();

  const gainOrLossChart = dc.pieChart(divRef);
  gainOrLossChart
    .slicesCap(3)
    .dimension(dimension)
    .group(group)
    // .label(function (d) {
    //   let label;
    //   if(d.key.toUpperCase() === "POSITIVE") {
    //     label = "お褒め";
    //   } else if (d.key.toUpperCase() === "NEGATIVE") {
    //     label = "ご不満";
    //   } else {
    //     label = "普通";
    //   }
    //   if (all.value()) {
    //     // label += ` - ${d.value} - ${(d.value / (all.value() as number) * 100).toFixed(1)}%`;
    //     label += ` - ${d.value}`;
    //   }
    //   return label;
    // })
    // .renderLabel(true)
    .innerRadius(50)
    .transitionDuration(500)
    .colors(d3.scaleOrdinal().range(['#1f77b4','#2ca02c','#ff7f0e']))
    // .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
    // .colorDomain([-1750, 1644])
    // .colorAccessor((d) => d.value)
    // .legend(dc.legend().highlightSelected(true))
    // workaround for #703: not enough data is accessible through .label() to display percentages
    .on('pretransition', function(chart) {
        chart.selectAll('text.pie-slice').text(function(d) {
            return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
        });
    });
  return gainOrLossChart;
};

export const CloudPieChart = (props) => (
  <ChartTemplate chartFunction={gainOrLossChartFunc} title="評価" chartType="chart-type-pie" />
);
