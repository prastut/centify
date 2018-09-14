import React, { Component } from "react";
//Material Styles

import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    color: "white",
    height: "100vh",
    width: "100vw",
    position: "relative"
  },
  trendingContainer: {
    position: "absolute",
    bottom: "0",
    height: "calc(100%*0.15)",
    width: "100%",
    transform: "translateY(-40%)",
    zIndex: "1",
    background: "rgba(0,0,0,0.41)",
    display: "flex",
    alignItems: "center",
    overflowX: "scroll"
  }
};

class FullScreen extends Component {
  render() {
    const { classes, isSpecificEntityView, trending, reaction } = this.props;

    return (
      <div className={classes.root}>
        {isSpecificEntityView ? (
          reaction
        ) : (
          <div className={classes.trendingContainer}>{trending}</div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(FullScreen);
