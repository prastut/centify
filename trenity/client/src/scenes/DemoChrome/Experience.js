import React, { Component } from "react";
//Material Styles

import { withStyles } from "@material-ui/core/styles";

//UI ELements

const styles = {
  trendingFullScreen: {
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
  },
  show: {
    opacity: 1,
    visibility: "visible",
    transition: "visibility 0s, opacity 1.5s linear"
  },
  hide: {
    visibility: "hidden",
    opacity: 0,
    transition: "visibility 0s, opacity 0.5s linear"
  }
};

class Experience extends Component {
  render() {
    const { classes, isSpecificEntityView, trending, reaction } = this.props;

    const trendingShowStyles = [classes.trendingFullScreen, classes.show].join(
      " "
    );
    // const trendingHideStyles = [classes.trendingFullScreen, classes.hide].join(
    //   " "
    // );

    if (isSpecificEntityView) {
      return reaction;
    }

    return <div className={trendingShowStyles}>{trending}</div>;
  }
}

export default withStyles(styles)(Experience);
