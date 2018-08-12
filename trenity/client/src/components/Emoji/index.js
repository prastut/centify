import React from "react";
import { withStyles } from "@material-ui/core";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { textToEmoji } from "../../helper";

const styles = {
  root: {
    position: "absolute",
    right: "15%",
    zIndex: "2",
    transition: "all 0.3s ease"
  },
  enter: {
    opacity: "1 !important",
    bottom: "calc(40% - 25px)"
  },
  enterActive: {
    opacity: "1 !important",
    bottom: "calc(70% - 25px)"
  },
  enterDone: {
    bottom: "calc(150% - 25px)",
    opacity: "0"
  },
  exit: {
    bottom: "calc(150% - 25px)",
    opacity: "0"
  },
  exitActive: {
    bottom: "calc(150% - 25px)",
    opacity: "0"
  },
  hack: {
    position: "absolute",
    opacity: "0"
  }
};

const Emoji = ({ classes, emoji }) => {
  const emojiAnimation = {
    enter: ["enter", classes.root, classes.enter].join(" "),
    enterActive: ["enter-active", classes.root, classes.enterActive].join(" "),
    enterDone: ["enter-done", classes.root, classes.enterDone].join(" "),
    exit: ["exit", classes.root, classes.exit].join(" "),
    exitActive: ["exit-active", classes.root, classes.exitActive].join(" "),
    exitDone: ["exit-done", classes.exitActive].join(" ")
  };
  return (
    <TransitionGroup component={null}>
      <CSSTransition
        classNames={{
          appear: emojiAnimation.enter,
          appearActive: emojiAnimation.enterActive,
          appearDone: emojiAnimation.enterDone,
          enter: emojiAnimation.enter,
          enterActive: emojiAnimation.enterActive,
          enterDone: emojiAnimation.enterDone,
          exit: emojiAnimation.exit,
          exitActive: emojiAnimation.exitActive,
          exitDone: emojiAnimation.exitDone
        }}
        key={emoji}
        timeout={2000}
      >
        <span className={classes.hack}>{textToEmoji(emoji.split("-")[0])}</span>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withStyles(styles)(Emoji);
