import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import { textToEmoji, checkImageExists } from "../../helper";
import { DUMMY_TWEET_IMAGE } from "../../sampleData";

const styles = {
  userContainer: {
    height: "60px",
    width: "60px",
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
  adImage: {
    width: "30px",
    height: "30px",
    borderRadius: "100%"
  },
  emoji: {
    fontSize: "2em"
  }
};

class TwitterUser extends Component {
  state = { imageExists: false };

  async componentDidMount() {
    const doesImageExist = await checkImageExists(
      this.props.tweet.userProfileImageURL
    );
    if (doesImageExist) {
      this.setState({ imageExists: true });
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.tweet.id !== prevProps.tweet.id) {
      const doesImageExist = await checkImageExists(
        this.props.tweet.userProfileImageURL
      );
      this.setState({ imageExists: doesImageExist });
    }
  }

  render() {
    const { classes, index, viewing, tweet, onUserClick } = this.props;

    const viewingStyles =
      index === viewing ? classes.userSelected : classes.userFaded;

    const imageSrc = this.state.imageExists
      ? tweet.userProfileImageURL
      : DUMMY_TWEET_IMAGE;

    return (
      <div
        className={classes.userContainer}
        onClick={() => (onUserClick ? onUserClick(index) : null)}
      >
        {tweet.type && tweet.type === "ad" ? (
          <span className={viewingStyles}>
            <img
              src={imageSrc}
              alt="twitter-user-profile"
              className={classes.adImage}
            />
          </span>
        ) : (
          <span className={viewingStyles}>
            <div className={classes.emoji}>{textToEmoji(tweet.emotion)}</div>
            <img
              src={imageSrc}
              className={classes.userImage}
              alt="twitter-user-profile"
            />
          </span>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(TwitterUser);
