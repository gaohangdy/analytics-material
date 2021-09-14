import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

// components
import PageTitle from "../../../components/PageTitle";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  dummyPanel: {
    backgroundImage: 'url("/resources/images/dummy.jpg")',
  }
}))

export default function Customize() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="カスタマイズ" />
      <Grid item xs={12} md={12}>
        <div>
        <img alt="coming soon" style={{width: '100%'}} src="/resources/images/dummy.jpg" />
        </div>
      </Grid>
    </>
  );
}
