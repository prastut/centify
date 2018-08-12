import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  elements: {
    flex: "1 0 33.33%"
  },
  textRight: {
    textAlign: "right"
  },
  textCenter: {
    textAlign: "center"
  },
  scoreAndTimeContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  score: {
    fontSize: "2em"
  },
  timeInsideMatch: {
    fontSize: "0.8em"
  }
};

const ScoreCard = ({ classes, teamOne, score, teamTwo, timeInsideMatch }) => (
  <div className={classes.root}>
    <div className={[classes.elements, classes.textRight].join(" ")}>
      {teamOne}
    </div>
    <div
      className={[classes.elements, classes.scoreAndTimeContainer].join(" ")}
    >
      <span className={classes.score}>
        {score[teamOne]} - {score[teamTwo]}
      </span>
      <span className={classes.timeInsideMatch}>
        {timeInsideMatch.format("HH:mm:ss")}
      </span>
    </div>
    <div className={classes.elements}>{teamTwo}</div>
  </div>
);

export default withStyles(styles)(ScoreCard);
