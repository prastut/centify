import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    height: "calc(100vh*0.10)",
    display: "flex",
    alignItems: "center",
    width: "calc(100vw*0.8)",
    maxWidth: "1000px",
    margin: "0 auto"
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

const MatchNavBar = ({ classes, teamOne, score, teamTwo, timeInsideMatch }) => (
  <Grid container className={classes.root}>
    <Grid item xs={4} className={classes.textRight}>
      {teamOne}
    </Grid>
    <Grid item xs={4} className={classes.textCenter}>
      <div className={classes.scoreAndTimeContainer}>
        <span className={classes.score}> 0 - 0</span>
        <span className={classes.timeInsideMatch}>
          {timeInsideMatch.format("HH:mm:ss")}
        </span>
      </div>
    </Grid>
    <Grid item xs={4}>
      {teamTwo}
    </Grid>
  </Grid>
);

export default withStyles(styles)(MatchNavBar);
