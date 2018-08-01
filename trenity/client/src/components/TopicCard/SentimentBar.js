import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    flex: "0 1 100%",
    height: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  positive: {
    background: "#00FFB6",
    borderRadius: "5px",
    transition: "flex-basis 1s linear",
    flexGrow: "0",
    flexShrink: "0",
    flexBasis: "50%",
    height: "10px"
  },
  emoji: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    fontSize: "1.5em"
  },
  negetive: {
    height: "10px",
    background: "#F15959",
    borderRadius: "5px",
    transition: "flex-basis 1s linear",
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
          style={{ left: `${positive - 5}%` }}
        >
          😅
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
