import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    fontSize: "0.8em",
    letterSpacing: "5px",
    margin: "20px 0"
  }
};

const Headings = ({ classes, text }) => (
  <div className={classes.root}>{text}</div>
);

export default withStyles(styles)(Headings);
