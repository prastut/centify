import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import { textToEmoji, checkImageExists, SAMPLE_DATA } from "../../helper";

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
  emoji: {
    fontSize: "2em"
  }
};

class TwitterUser extends Component {
  state = { imageExists: false };

  async componentDidMount() {
    const doesImageExist = await checkImageExists(this.props.tweet.image);
    if (doesImageExist) {
      this.setState({ imageExists: true });
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.tweet.id !== prevProps.tweet.id) {
      const doesImageExist = await checkImageExists(this.props.tweet.image);
      this.setState({ imageExists: doesImageExist });
    }
  }

  render() {
    const { classes, index, viewing, tweet, onUserClick } = this.props;

    const viewingStyles =
      index === viewing ? classes.userSelected : classes.userFaded;

    const imageSrc = this.state.imageExists
      ? tweet.image
      : SAMPLE_DATA.dummyTweetImage;

    return (
      <div
        className={classes.userContainer}
        onClick={() => (onUserClick ? onUserClick(index) : null)}
      >
        <span className={viewingStyles}>
          <div className={classes.emoji}>{textToEmoji(tweet.emotion)}</div>
          <img
            src={imageSrc}
            className={classes.userImage}
            alt="twitter-user-profile"
          />
        </span>
      </div>
    );
  }
}

export default withStyles(styles)(TwitterUser);
