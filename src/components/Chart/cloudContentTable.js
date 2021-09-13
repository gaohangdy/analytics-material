import React from "react";
import * as dc from "dc";

import { select, ascending, format as d3Format } from "d3";
import { WidgetTemplate } from "./widgetTemplate";

import { customSearch } from "./custom-search";

const tableFunc = (divRef, ndx) => {
  
  const nasdaqTable = dc.dataTable(divRef);

  const searchNameWidget = customSearch("#search-name");

  const dimension = ndx.dimension((d) => d.content);

  const contentDimension = ndx.dimension((d) => d.content);

  //   const avgGroup = dimension.group().reduce(
  //     function(p, v) { // add
  //         p[v.type] = (p[v.type] || 0) + v.value;
  //         return p;
  //     });

  //     function reversible_group(group) {
  //         return {
  //             top: function(N) {
  //                 return group.top(N);
  //             },
  //             bottom: function(N) {
  //                 return group.top(Infinity).slice(-N).reverse();
  //             }
  //         };
  //     }
  var group = dimension.group().reduce(
    // add
    function (p, v) {
      p.count++;
      return p;
    },
    // remove
    function (p, v) {
      p.count--;
      return p;
    },
    // init
    function init() {
      return {
        count: 0,
      };
    }
  );

  function reversible_group(group) {
    return {
      top: function (N) {
        return group.top(N);
      },
      bottom: function (N) {
        return group.top(Infinity).slice(-N).reverse();
      },
    };
  }

  searchNameWidget
  .dimension(contentDimension)
  .placeHolder("Please input content");

  nasdaqTable
    .dimension(dimension)
    .size(Infinity)
    .showSections(false)
    // .group(d=>{
    //     return d.content;
    // })
    // .group(group)
    .columns([
      function (d) {
        return d.content;
      },
    ])
    .sortBy(function (d) {
      return d.content;
    })
    .order(ascending)
    .on("preRender", update_offset)
    .on("preRedraw", update_offset)
    .on("pretransition", display)
    .on("renderlet", function (table) {
      table.selectAll(".dc-table-group").classed("info", true);
    });

  // use odd page size to show the effect better
  var ofs = 0,
    pag = 10;

  function update_offset() {
    var totFilteredRecs = ndx.groupAll().value();
    var end = ofs + pag > totFilteredRecs ? totFilteredRecs : ofs + pag;
    ofs =
      ofs >= totFilteredRecs
        ? Math.floor((totFilteredRecs - 1) / pag) * pag
        : ofs;
    ofs = ofs < 0 ? 0 : ofs;

    nasdaqTable.beginSlice(ofs);
    nasdaqTable.endSlice(ofs + pag);
  }
  function display() {
    var totFilteredRecs = ndx.groupAll().value();
    var end = ofs + pag > totFilteredRecs ? totFilteredRecs : ofs + pag;
    select("#begin").text(end === 0 ? ofs : ofs + 1);
    select("#end").text(end);
    select("#last").attr("disabled", ofs - pag < 0 ? "true" : null);
    select("#next").attr(
      "disabled",
      ofs + pag >= totFilteredRecs ? "true" : null
    );
    select("#size").text(totFilteredRecs);
    if (totFilteredRecs != ndx.size()) {
      select("#totalsize").text("(filtered Total: " + ndx.size() + " )");
    } else {
      select("#totalsize").text("");
    }
  }
  function next() {
    ofs += pag;
    update_offset();
    nasdaqTable.redraw();
  }
  function last() {
    ofs -= pag;
    update_offset();
    nasdaqTable.redraw();
  }

  return nasdaqTable;
};

export const CloudContentTable = (props) => (
  <WidgetTemplate
    chartFunction={tableFunc}
    chartType="chart-type-table"
  />
);
