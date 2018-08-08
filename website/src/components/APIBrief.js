import React from "react";
import injectSheet from "react-jss";
import { breakPoints } from "../helper";

const styles = {
  root: {
    width: "calc(100%*0.8)",
    margin: "0 auto",
    textAlign: "center",
    padding: "40px 0"
  },
  heading: {},
  subtext: {
    lineHeight: "1.4"
  },
  [`@media (${breakPoints.lg})`]: {
    root: {
      padding: "40px 250px"
    }
  }
};

const APIBrief = ({ classes, heading, subtext }) => (
  <div className={classes.root}>
    <h2 className={classes.heading}>{heading}</h2>
    <p className={classes.subtext}>{subtext}</p>
  </div>
);

export default injectSheet(styles)(APIBrief);
