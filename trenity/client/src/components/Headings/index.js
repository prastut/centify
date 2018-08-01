import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    fontSize: "0.8em",
    letterSpacing: "5px",
    margin: "20px 0"
  }
};

class Headings extends Component {
  render() {
    const { classes, text } = this.props;

    return <div className={classes.root}>{text}</div>;
  }
}

export default withStyles(styles)(Headings);
