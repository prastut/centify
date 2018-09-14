import React, { Component } from "react";
import Headings from "../../components/Headings";
//Material Styles

import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    color: "white",
    height: "100%",
    width: "100vw",
    background: "black"
  },
  navbar: {
    height: "calc(100%*0.10)"
  },
  events: {
    padding: "20px 0",
    minHeight: "95px"
  },
  trending: {},
  centerPadding: {
    width: "calc(100vw*0.9)",
    margin: "0 auto"
  },
  reaction: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  }
};

class SecondScreen extends Component {
  render() {
    const { classes, navbar, events, trending, reaction } = this.props;

    return (
      <div className={classes.root}>
        {navbar}
        <div className={classes.events}>{events}</div>
        <div className={classes.trending}>
          <div className={classes.centerPadding}>
            <Headings text="TRENDING ENTITIES" />
          </div>
          {trending}
        </div>
        <div className={classes.reaction}>
          <div className={classes.centerPadding}>
            <Headings text="TWEET STREAM" />
          </div>
          {reaction}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SecondScreen);
