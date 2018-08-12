import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { positiveSentimentToEmoji } from "../../helper";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "100%"
  },
  positive: {
    background: "#00FFB6",
    borderRadius: "5px",
    flexGrow: "0",
    flexShrink: "0",
    flexBasis: "50%",
    height: "10px"
  },
  emoji: {
    transition: "left 0.5s linear",
    position: "absolute",
    zIndex: 1,
    left: 0,
    fontSize: "1.5em"
  },
  negative: {
    height: "10px",
    background: "#F15959",
    borderRadius: "5px",
    flexGrow: "0",
    flexShrink: "0",
    flexBasis: "50%"
  }
};

const SentimentBar = ({ classes, positive, negative }) => (
  <div className={classes.root}>
    <div className={classes.positive} style={{ flexBasis: `${positive}%` }} />
    <span
      role="img"
      aria-label="emoji"
      className={classes.emoji}
      style={{ left: `${positive - 10}%` }}
    >
      {positiveSentimentToEmoji(positive)}
    </span>
    <div className={classes.negative} style={{ flexBasis: `${negative}%` }} />
  </div>
);

export default withStyles(styles)(SentimentBar);
