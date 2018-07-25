import React, { Component } from "react";
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
  slideToClickedSlide: true
};

const VERTICICAL_PARAMS = {
  direction: "vertical",
  spaceBetween: 20,
  slidesPerView: 6,
  slidesOffsetBefore: 10
};

class ReactionFeed extends Component {
  constructor(props) {
    super(props);

    this.swiper = null;
    this.beginSwitchToNextTweet = null;
    this.interval = null;
    this.socket = null;
    this.state = {
      viewing: 0
    };
  }

  // componentDidMount() {
  //   // if (this.props.variant === "onVideo") {
  //   //   this.swiper.setTranslate(200);
  //   //   console.log(this.swiper.getTranslate());
  //   // }
  //   this.beginSwitchToNextTweet = setTimeout(() => {
  //     this.goNext();
  //     this.autoSwitchToNextTweet(3);
  //   }, 2000);
  // }

  // componentDidUpdate() {
  //   const {selectedEntity: {tweets}} = this.props;
  //   const {viewing} = this.state;

  //   if (viewing < tweets.length - 1) {
  //     this.goNext();
  //   }
  // }

  componentWillUnmount() {
    clearTimeout(this.beginSwitchToNextTweet);
    clearInterval(this.interval);
  }

  autoSwitchToNextTweet = time => {
    this.interval = setInterval(() => {
      this.goNext();
    }, time * 1000);
  };

  handleClick = index => {
    // clearInterval(this.interval);
    this.setState({ viewing: this.swiper.activeIndex });
    // this.autoSwitchToNextTweet(5);
  };

  goNext = () => {
    if (this.swiper) {
      this.swiper.slideNext();
      this.setState({
        viewing: this.swiper.activeIndex
      });
    }
  };

  goPrevious = () => {
    if (this.swiper) {
      this.swiper.slidePrev();
      if (this.state.viewing !== 0) {
        this.setState({
          viewing: this.state.viewing - 1
        });
      }
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
    if (variant === "onVideo") {
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
          <div className={classes.onFullScreenTweetTextContainer}>
            <div className={classes.onFullScreenTweetText}>
              {tweets[viewing].tweet}
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
        <TweetBox text={tweets[viewing].tweet} />
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
