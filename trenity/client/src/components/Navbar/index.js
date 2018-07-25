import React, { Component } from "react";

// import Typography from "@material-ui/core/Typography";
// import ReactSwipe from "react-swipe";
// import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    width: "calc(100vw*0.8)",
    maxWidth: "1000px",
    height: "calc(100vh*0.10)",
    maxHeight: "60px",
    margin: "0 auto",
    color: "white",
    display: "flex",
    alignItems: "center"
  },
  brand: {
    fontSize: "1.5em"
  }
};

class Navbar extends Component {
  render() {
    const { classes, text } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.brand}>{text}</div>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
