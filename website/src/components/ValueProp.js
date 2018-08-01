import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    height: "calc(100% - 30px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  heading: {
    margin: "10px 0",
    fontSize: "3em"
  },
  subheading: {
    fontSize: "1.2em",
    margin: "10px 0"
  }
};

const ValueProp = ({ classes, heading, subheading, description }) => (
  <div className={classes.root}>
    <div className={classes.heading}>{heading}</div>
    <div className={classes.subheading}>{subheading}</div>
    <div>{description}</div>
  </div>
);

export default withStyles(styles)(ValueProp);
