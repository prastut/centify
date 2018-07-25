import React from "react";

import { withStyles } from "@material-ui/core/styles";

import { textToEmoji } from "../../helper";

const styles = {
  userContainer: {
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  userSelected: {
    position: "relative"
  },
  userFaded: {
    position: "relative",
    opacity: "0.5"
  },
  userImage: {
    width: "20px",
    height: "20px",
    borderRadius: "100%",
    position: "absolute",
    bottom: "0",
    right: "0",
    marginRight: "-0.4em"
  },
  emoji: {
    fontSize: "2em"
  }
};

const TwitterUser = ({ classes, index, viewing, tweet, onUserClick }) => {
  const viewingStyles =
    index === viewing ? classes.userSelected : classes.userFaded;
  return (
    <div className={classes.userContainer} onClick={() => onUserClick(index)}>
      <span className={viewingStyles}>
        <div className={classes.emoji}>{textToEmoji(tweet.emotion)}</div>
        <img
          src={tweet.image}
          className={classes.userImage}
          alt="twitter-user"
        />
      </span>
    </div>
  );
};
export default withStyles(styles)(TwitterUser);
