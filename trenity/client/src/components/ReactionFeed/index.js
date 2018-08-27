import React, { PureComponent } from "react";
import Swiper from "react-id-swiper";
import { isEmpty } from "ramda";
import { withStyles } from "@material-ui/core/styles";

import TweetBox from "./tweetBox";

import TopicCard from "../../components/TopicCard";
import TwitterUser from "../../components/TwitterUser";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  onFSRoot: {
    height: "100%",
    width: "100%",
    position: "absolute"
  },
  onFSleftContainer: {
    position: "absolute",
    left: "0",
    top: "0",
    width: "calc(100%*0.10)",
    height: "100%",
    background: "rgba(0,0,0,0.41)"
  },
  onFSEntityMenuContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  onFSEntity: {
    height: "calc(100%*0.20)",
    width: "100%"
  },
  onFSEmojisContainer: {
    height: "calc(100%*0.70)",
    width: "100%",
    display: "flex"
  },
  emojiInsideEmojisContainer: {
    fontSize: "14px"
  },
  onFSSelectedTweetContainer: {
    fontSize: "14px",
    position: "absolute",
    right: "0",
    height: "calc(100%*0.95)",
    width: "calc(100%*0.90)",
    fontFamily: "Rubik"
  },
  onFSEmojiPlusSelectedTweet: {
    position: "absolute",
    bottom: "0",
    display: "flex"
  },
  emojiInsideEmojiPlusSelectedTweet: {
    flex: "1 0 60px"
  },
  textInsideEmojiPlusSelectedTweet: {
    flex: "1 0 calc(100% - 60px)",
    padding: "20px 0"
  },
  exitCTA: {
    position: "absolute",
    right: 0,
    top: 0
  },
  exitButton: {
    color: "white",
    fontSize: "1em",
    background: "none",
    border: "none",
    padding: "10px"
  }
};

const PARAMS = {
  slidesPerView: 4,
  spaceBetween: 10,
  freeMode: true,
  slideToClickedSlide: true,
  grabCursor: true
};

const VERTICICAL_PARAMS = {
  direction: "vertical",
  spaceBetween: 20,
  slidesPerView: 6,
  freeMode: true,
  grabCursor: true
};

class ReactionFeed extends PureComponent {
  constructor(props) {
    super(props);

    this.swiper = null;
    this.automaticSwitchToNextTweetInterval = null;

    this.state = {
      viewing: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    //Previous
    const prevViewing = prevState.viewing;
    const prevSelectedEntity = prevProps.selectedEntity;
    const prevName = prevSelectedEntity.key;
    const prevTweets = prevSelectedEntity.tweets;

    //Current
    const currentViewing = this.state.viewing;
    const currentSelectedEntity = this.props.selectedEntity;
    const currentName = currentSelectedEntity.key;
    const currentTweets = currentSelectedEntity.tweets;

    console.log("Current Tweets Length->", currentTweets.length);
    console.log("Viewing->", currentViewing);
    if (!isEmpty(currentTweets) && currentTweets.length !== prevTweets.length) {
      clearInterval(this.automaticSwitchToNextTweetInterval);
      this.automaticSwitchingLogic();
    }

    //Viewing has been updated, need to slide to that
    if (currentViewing !== prevViewing) {
      this.swiper.slideTo(currentViewing);
    }

    if (currentViewing === currentTweets.length - 1) {
      clearInterval(this.automaticSwitchToNextTweetInterval);
      this.props.onPollEntityTweets();
    }

    //If this happens, that means entity has changed, reset viewing to original state
    if (currentName !== prevName) {
      clearInterval(this.automaticSwitchToNextTweetInterval);
      this.setState({ viewing: 0 });
    }
  }

  componentWillUnmount() {
    console.log("unmount");
    clearInterval(this.automaticSwitchToNextTweetInterval);
    this.props.onResetSpecificEntityState();
  }

  automaticSwitchingLogic = () => {
    if (this.state.viewing < this.props.selectedEntity.tweets.length - 1) {
      this.switchToNext();
    } else {
      console.log("end");
      //poll for more tweets
    }
  };

  switchToNext = () => {
    this.automaticSwitchToNextTweetInterval = setInterval(() => {
      this.setState(({ viewing }) => {
        return { viewing: viewing + 1 };
      });
    }, 2000);
  };

  handleClick = index => {
    clearInterval(this.automaticSwitchToNextTweetInterval);
    this.setState({ viewing: index }, this.automaticSwitchingLogic);
    // this.setState({ viewing: index })
  };

  handleExitEntityViewOnVideo = () => {
    clearInterval(this.automaticSwitchToNextTweetInterval);
    this.props.onResetSpecificEntityState();
  };

  render() {
    const { classes, variant, selectedEntity } = this.props;
    const { tweets } = selectedEntity;
    const { viewing } = this.state;

    if (variant === "onVideo" && selectedEntity.name) {
      return (
        <React.Fragment>
          <div className={classes.onFSleftContainer}>
            <div className={classes.onFSEntityMenuContainer}>
              <div className={classes.onFSEntity}>
                <TopicCard
                  variant="tile"
                  entityKey={selectedEntity.name}
                  entityImage={selectedEntity.image}
                />
              </div>
              <div className={classes.onFSEmojisContainer}>
                <Swiper
                  shouldSwiperUpdate
                  {...VERTICICAL_PARAMS}
                  ref={node => {
                    if (node) this.swiper = node.swiper;
                  }}
                >
                  {tweets.map((tweet, index) => (
                    <div
                      key={index}
                      className={classes.emojiInsideEmojisContainer}
                    >
                      <TwitterUser
                        index={index}
                        viewing={viewing}
                        tweet={tweet}
                        onUserClick={this.handleClick}
                      />
                    </div>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          {tweets[viewing] && (
            <div className={classes.onFSSelectedTweetContainer}>
              <div className={classes.onFSEmojiPlusSelectedTweet}>
                <div className={classes.emojiInsideEmojiPlusSelectedTweet}>
                  <TwitterUser
                    index={viewing}
                    viewing={viewing}
                    tweet={tweets[viewing]}
                  />
                </div>
                <div className={classes.textInsideEmojiPlusSelectedTweet}>
                  {tweets[viewing].tweet}
                </div>
              </div>
            </div>
          )}
          <div className={classes.exitCTA}>
            {/* <button onClick={exit}> X</button> */}
            <button
              className={classes.exitButton}
              onClick={this.handleExitEntityViewOnVideo}
            >
              {" "}
              X
            </button>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className={classes.root}>
        {tweets[viewing] && <TweetBox text={tweets[viewing].tweet} />}
        <div>
          <Swiper
            shouldSwiperUpdate
            {...PARAMS}
            ref={node => {
              if (node) this.swiper = node.swiper;
            }}
          >
            {tweets.map((tweet, index) => (
              <div key={index}>
                <TwitterUser
                  index={index}
                  viewing={viewing}
                  tweet={tweet}
                  onUserClick={this.handleClick}
                />
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ReactionFeed);
