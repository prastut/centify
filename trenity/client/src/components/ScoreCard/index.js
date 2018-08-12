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
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    textAlign: "center"
  },
  score: {
    fontSize: "2em",
    flex: "1 1 100%"
  },
  timeInsideMatch: {
    fontSize: "0.8em",
    flex: "1 1 100%"
  }
};

const ScoreCard = ({ classes, teamOne, score, teamTwo, timeInsideMatch }) => (
  <div className={classes.root}>
    <div className={[classes.elements, classes.textRight].join(" ")}>
      {teamOne}
    </div>
    <div className={classes.scoreAndTimeContainer}>
      <div className={classes.score}>
        {score[teamOne]} - {score[teamTwo]}
      </div>
      <div className={classes.timeInsideMatch}>
        {timeInsideMatch.format("HH:mm:ss")}
      </div>
    </div>
    <div className={classes.elements}>{teamTwo}</div>
  </div>
);

export default withStyles(styles)(ScoreCard);
