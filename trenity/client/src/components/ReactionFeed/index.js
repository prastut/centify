import React, { PureComponent } from "react";
import { isEmpty } from "ramda";
import Swiper from "react-id-swiper";

import { withStyles } from "@material-ui/core/styles";

import TwitterUser from "./twitterUser";
import TweetBox from "./tweetBox";

import TopicCard from "../../components/TopicCard";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  onFullScreenRoot: {
    height: "100%",
    width: "100%",
    position: "absolute"
  },
  onFullScreenleftContainer: {
    position: "absolute",
    left: "0",
    top: "0",
    width: "calc(100%*0.08)",
    height: "100%",
    background: "rgba(0,0,0,0.41)"
  },
  onFullScreenEntityMenuContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  onFullScreenEntity: {
    height: "calc(100%*0.20)",
    width: "100%"
  },
  onFullScreenEmojis: {
    display: "flex",
    height: "calc(100%*0.80)",
    width: "100%"
  },
  onFullScreenTweet: {
    flex: "1 0 auto",
    margin: "20px 0",
    width: "100%"
  },
  onFullScreenTweetTextContainer: {
    position: "absolute",
    bottom: "0",
    right: "0",
    height: "calc(100%*0.15)",
    width: "calc(100%*0.92)",
    background: "rgba(0,0,0,0.41)",
    transform: "translateY(-40%)",
    display: "flex",
    alignItems: "center",
    fontFamily: "Rubik"
  },
  onFullScreenTweetText: {
    width: "calc(100%*0.95)",
    margin: "0 auto"
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
  slidesPerView: 4,
  grabCursor: true
};

class ReactionFeed extends PureComponent {
  constructor(props) {
    super(props);

    this.swiper = null;
    this.pollInterval = null;

    this.state = {
      viewing: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedEntity.name) {
      //If entity is changed, so names will change, viewing = 0
      if (this.props.selectedEntity.name !== prevProps.selectedEntity.name) {
        this.setState({ viewing: 0 });
        //Since new entity poll for tweets
        this.props.onPollEntityTweets();
      } else {
        //If entity remains the same, poll tweets
        const tweetsCount = this.props.selectedEntity.tweets.length;

        if (tweetsCount === 0) {
          console.log("poll");
          this.props.onPollEntityTweets();
        } else if (this.state.viewing === tweetsCount - 1) {
          this.props.onPollEntityTweets();
        }

        //Add a condition to poll Tweets when the last viewing state didn't result in polling tweets;
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollInterval);
  }

  handleClick = index => {
    this.swiper.slideTo(index);
    this.setState({ viewing: index });
    // this.autoSwitchToNextTweet(5);
  };

  goNext = () => {
    if (this.swiper) {
      const { viewing } = this.state;
      const nextViewing = viewing + 1;
      this.swiper.slideTo(nextViewing);
      this.setState({
        viewing: nextViewing
      });
    }
  };

  render() {
    const {
      classes,
      variant,
      selectedEntity,
      onExitEntityViewOnVideo
    } = this.props;
    const { tweets } = selectedEntity;
    const { viewing } = this.state;

    if (variant === "onVideo" && selectedEntity.name) {
      return (
        <React.Fragment>
          <div className={classes.onFullScreenleftContainer}>
            <div className={classes.onFullScreenEntityMenuContainer}>
              <div className={classes.onFullScreenEntity}>
                <TopicCard
                  variant="tile"
                  entityKey={selectedEntity.name}
                  entityImage={selectedEntity.image}
                />
              </div>
              <div className={classes.onFullScreenEmojis}>
                <Swiper
                  shouldSwiperUpdate
                  {...VERTICICAL_PARAMS}
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
          </div>
          <div className={classes.onFullScreenTweetTextContainer}>
            <div className={classes.onFullScreenTweetText}>
              {!isEmpty(tweets) && tweets[viewing].tweet}
            </div>
          </div>
          <div className={classes.exitCTA}>
            {/* <button onClick={exit}> X</button> */}
            <button
              className={classes.exitButton}
              onClick={onExitEntityViewOnVideo}
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
        {!isEmpty(tweets) && <TweetBox text={tweets[viewing].tweet} />}
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
