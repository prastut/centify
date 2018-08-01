import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { positiveSentimentToEmoji } from "../../helper";

const styles = {
  root: {
    flex: "0 1 80%",
    height: "30%",
    display: "flex",
    alignItems: "center",
    position: "relative"
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
  negetive: {
    height: "10px",
    background: "#F15959",
    borderRadius: "5px",
    flexGrow: "0",
    flexShrink: "0",
    flexBasis: "50%"
  }
};

class SentimentBar extends PureComponent {
  render() {
    const { classes, positive, negetive } = this.props;

    return (
      <div className={classes.root}>
        <div
          className={classes.positive}
          style={{ flexBasis: `${positive}%` }}
        />
        <span
          role="img"
          aria-label="emoji"
          className={classes.emoji}
          style={{ left: `${positive - 10}%` }}
        >
          {positiveSentimentToEmoji(positive)}
        </span>
        <div
          className={classes.negetive}
          style={{ flexBasis: `${negetive}%` }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SentimentBar);
