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
    width: "50px",
    height: "50px",
    borderRadius: "75px"
  },
  emoji: {
    position: "absolute",
    bottom: "0",
    right: "0",
    marginRight: "-0.4em",
    marginBottom: "-0.2em",
    fontSize: "25px"
  }
};

const TwitterUser = ({ classes, index, viewing, tweet, onUserClick }) => {
  const viewingStyles =
    index === viewing ? classes.userSelected : classes.userFaded;
  return (
    <div className={classes.userContainer} onClick={() => onUserClick(index)}>
      <span className={viewingStyles}>
        <img
          src={tweet.profile_image}
          className={classes.userImage}
          alt="twitter-user"
        />
        <div className={classes.emoji}>{textToEmoji(tweet.emotion)}</div>
      </span>
    </div>
  );
};
export default withStyles(styles)(TwitterUser);
