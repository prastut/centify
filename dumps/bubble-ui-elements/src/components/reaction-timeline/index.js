import React, { Component } from "react";

import "../../../node_modules/react-vis/dist/style.css";
import { FlexibleXYPlot, VerticalBarSeries, GradientDefs } from "react-vis";
// import Typography from "@material-ui/core/Typography";
// import ReactSwipe from "react-swipe";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    height: "calc(100vh*0.3)",
    width: "100vw",
    marginTop: "30px",
    marginBottom: "-30px"
  }
};

const gradient = (
  <GradientDefs>
    <linearGradient
      id="myGradient"
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1="0"
      x2="200"
      y2="200"
    >
      <stop offset="0%" stopColor="#63E1F0" />
      <stop offset="50%" stopColor="#57A0F1" />
      <stop offset="80%" stopColor="#4A56F1" />
    </linearGradient>
  </GradientDefs>
);

class ReactionTimeline extends Component {
  state = {
    data: [
      { x: 0, y: Math.random() * 10 },
      { x: 1, y: Math.random() * 10 },
      { x: 2, y: Math.random() * 10 },
      { x: 3, y: Math.random() * 10 },
      { x: 4, y: Math.random() * 10 },
      { x: 5, y: Math.random() * 10 },
      { x: 6, y: Math.random() * 10 },
      { x: 7, y: Math.random() * 10 },
      { x: 8, y: Math.random() * 10 },
      { x: 9, y: Math.random() * 10 }
    ]
  };

  changeData = () => {
    this.setState({
      data: [
        { x: 0, y: Math.random() * 10 },
        { x: 1, y: Math.random() * 10 },
        { x: 2, y: Math.random() * 10 },
        { x: 3, y: Math.random() * 10 },
        { x: 4, y: Math.random() * 10 },
        { x: 5, y: Math.random() * 10 },
        { x: 6, y: Math.random() * 10 },
        { x: 7, y: Math.random() * 10 },
        { x: 8, y: Math.random() * 10 },
        { x: 9, y: Math.random() * 10 }
      ]
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FlexibleXYPlot>
          {gradient}
          <VerticalBarSeries
            data={this.state.data}
            color={"url(#myGradient)"}
          />
        </FlexibleXYPlot>
      </div>
    );
  }
}

export default withStyles(styles)(ReactionTimeline);
