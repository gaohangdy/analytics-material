import React from "react";
import { WidgetTemplate } from "./widgetTemplate";
import { customSearch } from "./custom-search";

const gainOrLossChartFunc = (divRef, ndx) => {

  const contentDimension = ndx.dimension((d) => d.content);

  const searchNameWidget = customSearch(divRef);
  searchNameWidget
  .dimension(contentDimension)
  .placeHolder("Please input content");
  return searchNameWidget;
};

export const CloudSearchWidget = (props) => (
  <WidgetTemplate chartFunction={gainOrLossChartFunc} />
);
