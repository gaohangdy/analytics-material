import React from "react";
import * as dc from "dc";
import * as d3 from "d3";
import cloud from "d3-cloud";
import { timeFormat } from "d3";
import { ChartTemplate } from "./chartTemplate";

dc.wordcloudChart = function (parent, chartGroup) {
  var _chart = dc.baseMixin({});

  var _cloud = null,
    _g = null,
    _padding = 5,
    _font = "Impact",
    // _relativeSize = 10,
    _relativeSize = 5,
    _minX = 0,
    _minY = 0,
    _fill = d3.scaleOrdinal(d3.schemeCategory10); //d3.scale.category20();

  _chart._doRender = function () {
    _chart.on("postRender", function () {
      _chart.apply();
    });
    drawWordCloud();

    return _chart._doRedraw();
  };

  function initializeSvg() {
    _chart.select("svg").remove();

    _g = d3
      .select(_chart.anchor())
      .append("svg")
      .attr("height", _chart.height())
      // .attr("height", 200)
      .attr("width", _chart.width())
      .attr("cursor", "pointer");
  }

  var titleFunction = function (d) {
    return _chart.title()(d);
  };

  function drawWordCloud() {
    initializeSvg();

    var groups = _chart
      ._computeOrderedGroups(_chart.data())
      .filter(function (d) {
        // return _chart.valueAccessor()(d) !== 0;
        return _chart.valueAccessor()(d) > 10;
      });

    var data = groups.map(function (d, i) {
      var value = _chart.valueAccessor()(d);
      var key = _chart.keyAccessor()(d);
      var title = _chart.title()(d);
      var result = {
        text: d.key,
        size: checkSize(d),
        value: value,
        key: key,
        title: title,
        fill: _fill(i),
        x: d.x,
        y: d.y,
      };

      return result;
    });

    // const displaySelection = _g.append("text")
    // .attr("font-family", "Lucida Console, Courier, monospace")
    // .attr("text-anchor", "start")
    // .attr("alignment-baseline", "hanging")
    // .attr("x", 10)
    // .attr("y", 10);
    _chart.width(parent.parentElement.offsetWidth - 24);
    _chart.height(parent.parentElement.offsetHeight - 24);

    _cloud = cloud().size([_chart.width(), _chart.height()]);

    _cloud
      .words(data)
      .padding(_chart.padding())
      .rotate(function () {
        return ~~(Math.random() * 2) * 90;
      })
      .font(_chart.font())
      .fontSize(function (d) {
        // return 16;
        return d.size;
      })

      .on("word", ({ size, x, y, rotate, text, fill }) => {
        _g.append("text")
          .attr("font-size", size)
          // .attr("font-size", "12px")
          .attr("text-anchor", "middle")
          .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
          .text(text)
          // .classed("click-only-text", true)
          // .classed("word-default", true)
          .style("fill", fill)          
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut)
          .on("click", handleClick);

        function handleMouseOver(d, i) {
          d3.select(this)
            .classed("word-hovered", true)
            .transition(`mouseover-${text}`)
            .duration(300)
            .ease(d3.easeLinear)
            .attr("font-size", size + 2)
            .attr("font-weight", "bold");
        }

        function handleMouseOut(d, i) {
          d3.select(this)
            .classed("word-hovered", false)
            .interrupt(`mouseover-${text}`)
            .attr("font-size", size);
        }

        function handleClick(d, i) {
          var e = d3.select(this);
          var filterfun = e.text()
            ? function (val) {
                // return new RegExp(e.text(), "i").test(val);
                return val;
              }
            : null;
          console.log("Select: " + e.text());
          _chart._dimension.filter(e.text());
          // displaySelection.text(`selection="${e.text()}"`);
          e.classed("word-selected", !e.classed("word-selected"));
        }
      })

      .on("end", draw);

    _cloud.start();
  }

  _chart._doRedraw = function () {
    _chart.on("postRedraw", function () {
      _chart.apply();
    });

    drawWordCloud();
  };

  _chart.apply = function () {
    d3.select(_chart.anchor())
      .select("svg")
      .attr(
        "viewBox",
        _chart.minX() +
          " " +
          _chart.minY() +
          " " +
          _chart.width() +
          " " +
          _chart.height(),
      );
  };

  function checkSize(d) {
    var x = 0;
    if (d.value <= 0) {
      x = 0;
    } else {
      x = Math.log(d.value) * _chart.relativeSize();
    }

    return x;
  }

  function draw(words) {
    // _g.attr("width", _chart.width())
    //   .attr("height", _chart.height())
    //   .attr(
    //     "transform",
    //     "translate(" + _chart.width() / 2 + "," + _chart.height() / 2 + ")",
    //   )
    //   .selectAll("text")
    //   .data(words)
    //   .enter()
    //   .append("a")
    //   // .on("click", function (d) {
    //   //   // setvalue(d.text);
    //   //   console.log(d);
    //   //   return false;
    //   // })
    //   .append("text")
    //   .style("font-size", function (d) {
    //     return d.size + "px";
    //   })
    //   .on("click", function (d) {
    //     // setvalue(d.text);
    //     console.log(d);
    //     return false;
    //   })
    //   .style("font-family", _chart.font())
    //   .style("fill", function (d, i) {
    //     return _fill(i);
    //   })
    //   .attr("text-anchor", "middle")
    //   .attr("transform", function (d) {
    //     return "translate(" + [d.x, d.y] + ")";
    //   })
    //   .text(function (d) {
    //     return d.text;
    //   })
    //   .append("title")
    //   .text(function (d) {
    //     return d.title;
    //   });
  }

  _chart.minX = function (_) {
    if (!arguments.length) {
      return _minX;
    }

    _minX = _;
    return _chart;
  };

  _chart.minY = function (_) {
    if (!arguments.length) {
      return _minY;
    }

    _minY = _;
    return _chart;
  };

  _chart.padding = function (_) {
    if (!arguments.length) {
      return _padding;
    }

    _padding = _;
    return _chart;
  };

  _chart.font = function (_) {
    if (!arguments.length) {
      return _font;
    }

    _font = _;
    return _chart;
  };

  // _chart.coordinateAccessor = function (_) {
  //     if (!arguments.length) {
  //         return _coordinate;
  //     };

  //     _coordinate = _;
  //     return _chart;
  // };

  // _chart.radiusAccessor = function (_) {
  //     if (!arguments.length) {
  //         return _radiusAccessor;
  //     }

  //     _radiusAccessor = _;
  //     return _chart;
  // };

  _chart.relativeSize = function (_) {
    if (!arguments.length) {
      return _relativeSize;
    }

    _relativeSize = _;
    return _chart;
  };

  return _chart.anchor(parent, chartGroup);
};

const wordCloudChartFunc = (divRef, ndx) => {
  const wordcloudChart = dc.wordcloudChart(divRef);
  const queryDateFormat = timeFormat("%Y-%m-%dT%H:%M:%SZ");
  console.log("Dimension Start: " + queryDateFormat(new Date()));
  const wordDim = ndx.dimension((d) => d.word_list, true);

  // const wordGroup = wordDim.group().reduceSum((d) => d.value);
  const wordDim1 = wordDim.filter("着る");
  const wordGroup = wordDim1.group().reduceCount();
  console.log("Dimension End: " + queryDateFormat(new Date()));
  wordcloudChart.options({
    // height: 350,
    // width: 410,
    minY: 0,
    minX: 0,
    relativeSize: 5,
    dimension: wordDim,
    group: wordGroup,
    valueAccessor: function (d) {
      return d.value;
    },
    title: function (d) {
      return [d.key, "Word Count: " + d.value].join("\n");
    },
  });

  // wordcloudChart.render();
  return wordcloudChart;
};

export const WordCloudChart = (props) => (
  <ChartTemplate chartFunction={wordCloudChartFunc} title="Word Cloud" />
);
