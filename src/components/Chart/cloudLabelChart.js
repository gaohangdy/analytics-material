import React from "react";
import * as dc from "dc";
import { ChartTemplate } from "./chartTemplate";

const cloudLabelFunc = (divRef, ndx) => {
    const dayOfWeekChart = dc.rowChart(divRef)
    const dimension = ndx.dimension(function (d) {
        // var day = d.dd.getDay();
        // var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        // return day + '.' + name[day];
        return d.label_codes;
        // return d.label_code;
    }, true);
    const group = dimension.group()
    dayOfWeekChart
    .dimension(dimension)
    .group(group)

    return dayOfWeekChart
}

export const CloudLabelChart = props => (
    <ChartTemplate chartFunction={cloudLabelFunc} title="ラベル" chartType="chart-type-row" />
)

