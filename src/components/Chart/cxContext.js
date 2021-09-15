import React from "react";
import crossfilter from "crossfilter2";
import { json, csv, timeFormat, timeParse, timeMonth, timeWeek, format } from "d3";

export const CXContext = React.createContext("CXContext");
export const dateFormatSpecifier = "%Y-%m-%d";
export const dateFormat = timeFormat(dateFormatSpecifier);
export const dateFormatParser = timeParse(dateFormatSpecifier);
export const numberFormat = format(".2f");

export class DataContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, hasNDX: false };
  }

  queryData(startDate, endDate) {
    console.log("Execute queryData method.");

    const queryDateFormat = timeFormat("%Y-%m-%dT%H:%M:%SZ");
    const strStartDate = queryDateFormat(startDate);
    const strEndDate = queryDateFormat(endDate);

    // if (this.state.hasNDX) {
    //   return;
    // }
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });

    console.log("Request data: " + queryDateFormat(new Date()));
    json(
      "./testdata.json",
      // "http://35.200.126.162:8888/pac/v1/search/home/contents?start_date=" + strStartDate + "&&end_date=" + strEndDate,
      {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    ).then((result) => {
      console.log("Recieve data: " + queryDateFormat(new Date()));
      console.log("Total: " + result.contents.length);
      if (result.status_code === "200") {

        result.contents.forEach(function (d) {
          var shortDate = d.publish_timestamp.substring(0, 10);
          d.dd = dateFormatParser(shortDate);
          d.month = timeMonth(d.dd); // pre-calculate month for better performance
          d.week = timeWeek(d.dd);

          if(d.sentiment.toUpperCase() === "POSITIVE") {
            d.ctype = 0;
          } else if (d.sentiment.toUpperCase() === "NEGATIVE") {
            d.ctype = 1;
          } else {
            d.ctype = 2;
          }
        });


        // this.ndx = crossfilter(formatApiResult(result.contents)); //TODO possibly need to update this
        this.ndx = crossfilter(result.contents);

        console.log("SetCross data: " + queryDateFormat(new Date()));
        this.setState({ loading: false, hasNDX: true });
      } else {
        this.setState({ loading: false, hasNDX: false });
      }
    });    

  }

  componentDidMount() {
    const dateParse = timeParse("%Y-%m-%dT%H:%M:%SZ");
    const startDate=dateParse("2021-07-20T04:30:39Z");
    const endDate=dateParse("2021-08-20T23:45:31Z");

    this.queryData(startDate, endDate);
  }

  render() {
    if (!this.state.hasNDX) {
      return null;
    }
    // if (this.state.loading) {
    //   return <div className="loader" />;
    // }
    return (
      <CXContext.Provider value={{ ndx: this.ndx }}>
        <div ref={this.parent}>{this.props.children}</div>
      </CXContext.Provider>
    );
  }
}
