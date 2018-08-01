import React, { Component } from "react";
import Headings from "../../components/Headings";
//Material Styles

import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    color: "white",
    height: "100%",
    width: "100vw"
  },
  navbar: {
    height: "calc(100%*0.10)"
  },
  events: {
    padding: "20px 0",
    height: "calc(100%*0.10 - 20px)",
    minHeight: "95px"
  },
  trending: {
    height: "calc(100%*0.40)",
    width: "calc(100%*0.8)",
    margin: "0px auto",
    display: "flex",
    flexDirection: "column"
  },
  centerPadding: {
    width: "calc(100vw*0.8)",
    margin: "0 auto"
  },
  reaction: {
    height: "calc(100%*0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  }
};

class SecondScreenExperience extends Component {
  render() {
    const {
      classes,
      isFullScreen,
      navbar,
      events,
      trending,
      reaction,
      children
    } = this.props;

    return (
      <div className={classes.root}>
        {!isFullScreen && <div className={classes.navbar}>{navbar}</div>}
        {children}
        {!isFullScreen && (
          <React.Fragment>
            <div className={classes.events}>{events}</div>
            <div className={classes.trending}>
              <Headings text="TRENDING ENTITIES" />
              {trending}
            </div>
            <div className={classes.reaction}>
              <div className={classes.centerPadding}>
                <Headings text="TWEET STREAM" />
              </div>
              {reaction}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SecondScreenExperience);
