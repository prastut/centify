import React, { Component } from "react";
import Swiper from "react-id-swiper";
import { withStyles } from "@material-ui/core/styles";
import { isEmpty } from "ramda";
import openSocket from "socket.io-client";

import { getEntityTweets, ENTITY_TWEETS_URL } from "../../api";

import TwitterUser from "./twitterUser";
import TweetBox from "./tweetBox";

const formatDateToUTC = date =>
  `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;

const styles = {
  root: {
    height: "calc(100vh*0.25)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  }
};

const PARAMS = {
  slidesPerView: 4,
  spaceBetween: 20,
  freeMode: true,
  slideToClickedSlide: true,
  slidesOffsetBefore: 10,
  slidesOffsetAfter: 10
};

class ReactionFeed extends Component {
  constructor(props) {
    super(props);
    this.swiper = null;
    this.interval = null;
    this.socket = null;
    this.state = {
      viewing: 0
    };
  }

  componentDidMount() {
    // this.socket = openSocket(ENTITY_TWEETS_URL);
    // this.socket.on("Entity_Tweet", entity => {
    //   const tweets = [...this.state.tweets];
    //   tweets.push(JSON.parse(entity.data));
    //   this.setState({ tweets });
    // });
    // this.pollEntityTweets();
    // this.interval = setInterval(() => {
    //   if (this.state.viewing === this.props.tweets.length - 1) {
    //     this.slideToBeg();
    //   } else {
    //     this.goNext();
    //   }
    // }, 2000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.pollEntityTweets();
    }
  }

  componentWillUnmount() {
    console.log("hello");
    this.socket.off("Entity_Tweet");
    this.socket.close();
  }

  pollEntityTweets = () => {
    this.setState({ tweets: [] });
    this.socket.emit(
      "entities",
      this.props.selected,
      formatDateToUTC(new Date())
    );
  };

  handleClick = index => {
    this.setState({ viewing: index });
  };

  goNext = () => {
    if (this.swiper) {
      this.swiper.slideNext();
      this.setState({
        viewing: this.state.viewing + 1
      });
    }
  };

  slideToBeg = () => {
    if (this.swiper) {
      this.swiper.slideTo(0);
      this.setState({
        viewing: 0
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
    const { classes } = this.props;
    const { tweets, viewing } = this.state;

    if (isEmpty(tweets)) {
      return null;
    }
    let currentTweet;
    try {
      currentTweet = tweets[viewing].tweet;
    } catch (error) {
      console.log(tweets);
      console.log(error);
    }

    return (
      <div className={classes.root}>
        <TweetBox text={currentTweet} />
        <div>
          <Swiper
            shouldSwiperUpdate
            {...PARAMS}
            ref={node => {
              if (node) this.swiper = node.swiper;
            }}
          >
            {tweets.map((t, index) => (
              <div key={index}>
                <TwitterUser
                  index={index}
                  viewing={viewing}
                  tweet={t}
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
