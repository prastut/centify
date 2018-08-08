import React from "react";
import injectSheet from "react-jss";

const styles = {
  root: {
    height: "calc(100% - 30px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  contentWrapper: {
    width: "calc(100%*0.8)",
    margin: "0 auto"
  },
  heading: {
    margin: "10px 0",
    fontSize: "3em",
    fontWeight: "700"
  },
  subheading: {
    fontSize: "1.2em",
    margin: "10px 0"
  }
};

const ValueProp = ({ classes, heading, subheading, description }) => (
  <div className={classes.root}>
    <div className={classes.contentWrapper}>
      <div className={classes.heading}>{heading}</div>
      <div className={classes.subheading}>{subheading}</div>
      <div>{description}</div>
    </div>
  </div>
);

export default injectSheet(styles)(ValueProp);
