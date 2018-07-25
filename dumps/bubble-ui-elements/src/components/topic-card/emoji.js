import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { textToEmoji } from "../../helper";

const styles = {
  emoji: {
    position: "absolute",
    right: "15%",
    zIndex: "1",
    transition: "all 0.3s ease"
  },
  emojiEnter: {
    opacity: "1",
    bottom: "calc(40% - 25px)"
  },
  emojiEnterActive: {
    opacity: "1",
    bottom: "calc(70% - 25px)"
  },
  emojiEnterDone: {
    bottom: "calc(150% - 25px)",
    opacity: "0"
  },
  emojiExit: {
    bottom: "calc(150% - 25px)",
    opacity: "0"
  },
  emojiExitActive: {
    bottom: "calc(150% - 25px)",
    opacity: "0"
  },
  hack: {
    position: "absolute"
  }
};

class Emoji extends Component {
  state = {};
  render() {
    const { classes, emoji } = this.props;

    if (!emoji) {
      return null;
    }

    const emojiAnimation = {
      enter: ["enter", classes.emoji, classes.emojiEnter].join(" "),
      enterActive: [
        "enter-active",
        classes.emoji,
        classes.emojiEnterActive
      ].join(" "),
      enterDone: ["enter-done", classes.emoji, classes.emojiEnterDone].join(
        " "
      ),
      exit: ["exit", classes.emoji, classes.emojiExit].join(" "),
      exitActive: ["exit-active", classes.emoji, classes.emojiExitActive].join(
        " "
      ),
      exitDone: ["exit-done", classes.emojiExitActive].join(" ")
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
          <span className={classes.hack}>
            {textToEmoji(emoji.split("-")[0])}
          </span>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withStyles(styles)(Emoji);
