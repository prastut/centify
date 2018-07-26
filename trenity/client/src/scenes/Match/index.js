import React, { Component } from "react";
import moment from "moment";
import queryString from "query-string";
import { concat, isEmpty, toPairs, sort, fromPairs } from "ramda";

//API
import axios from "axios";
import openSocket from "socket.io-client";

import MatchView from "./MatchView";

//Assets
import "../../assets/css/swiper.min.css";
// import video from "../../assets/video/sample_video.mp4";

class Match extends Component {
  constructor(props) {
    super(props);

    this.socket = null;

    //Intervals
    this.simulationMatchIntervalTimer = null;
    this.eventsInterval = null;
    this.trendingEntitiesInterval = null;
    this.emojisEntitiesInterval = null;

    //Moved this interval to ReactionFeed
    this.specificEntityPollingTweetsInterval = null;

    //Timeouts
    this.toggleTrendingOnVideo = null;

    //MatchDataPacket
    this.match = {};
    this.state = {
      startSimulation: false,
      timeInsideMatch: "",
      events: [],
      trending: {
        entities: {},
        visible: true
      },
      emojis: {},
      selectedEntity: {
        name: "",
        tweets: [],
        image: ""
      },
      video: {
        playing: false,
        fullScreen: false,
        src: "",
        muted: true
      }
    };
  }

  async componentDidMount() {
    //http://localhost:3000/match/CROFRA_FINAL?link=bit.ly/2JUMWHl&matchStart=13&key=Mario_Mandzukic&throttleAt=20
    try {
      this.setupSocket();
      this.match = await this.getMatchData();

      //Video Link
      const { link } = queryString.parse(this.props.location.search);

      if (this.match.isLive) {
        //match is live, directly simulate
      } else {
        //match is in the past, simulate it.

        this.setState({
          startSimulation: true,
          timeInsideMatch: this.match.startTime,
          video: {
            ...this.state.video,
            src: `https://${link}`
          }
        });

        this.setupSocketListeners();
        this.setupIntervals();
        this.firstTimeFire();
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    this.socket.close();
    clearInterval(this.simulationMatchIntervalTimer);
    clearInterval(this.eventsInterval);
    clearInterval(this.trendingEntitiesInterval);
    clearInterval(this.emojisEntitiesInterval);
    clearInterval(this.specificEntityPollingTweetsInterval);
  }

  firstTimeFire = () => {
    this.getTrendingEntities();
  };

  //Sockets
  setupSocket = () => {
    if (window.location.href.split("//")[1].split(":")[0] === "localhost") {
      this.socket = openSocket("http://localhost:5000/");
    } else {
      this.socket = openSocket("https://trenity/");
    }
  };

  setupIntervals = () => {
    const throttleRateInSeconds = {
      timer: 1,
      events: 1,
      trending: 10,
      emojis: 2
    };

    this.simulationMatchIntervalTimer = setInterval(() => {
      this.tick();
    }, throttleRateInSeconds.timer * 1000);

    this.eventsInterval = setInterval(
      async () => await this.getEventsUntil(),
      throttleRateInSeconds.events * 1000
    );

    this.trendingEntitiesInterval = setInterval(() => {
      this.getTrendingEntities();
    }, throttleRateInSeconds.trending * 1000);

    this.emojisEntitiesInterval = setInterval(() => {
      this.socket.emit(
        "get trending emojis",
        this.state.timeInsideMatch,
        this.match.matchId
      );
    }, throttleRateInSeconds.emojis * 1000);
  };

  setupSocketListeners = () => {
    this.socket.on("trending emojis", trendingEmojis => {
      this.setState({
        emojis: {
          ...this.state.emojis,
          ...trendingEmojis
        }
      });
    });

    this.socket.on("entity tweets", tweets => {
      if (!isEmpty(tweets)) {
        this.setState(({ selectedEntity }) => ({
          selectedEntity: {
            ...selectedEntity,
            tweets: [...selectedEntity.tweets, ...tweets]
          }
        }));
      }
    });
  };

  //Setting Up Match
  getMatchData = async () => {
    const { matchId } = this.props.match.params;
    const { matchStart } = queryString.parse(this.props.location.search);

    const matchPromise = await axios.get(`/api/match/data/${matchId}`);
    const { matchName, teamOneId, teamTwoId, isLive } = matchPromise.data;

    const teamOnePromise = axios.get(`/api/team/entities/${teamOneId}`);
    const teamTwoPromise = axios.get(`/api/team/entities/${teamTwoId}`);

    const [teamOne, teamTwo] = await Promise.all([
      teamOnePromise,
      teamTwoPromise
    ]);

    console.log();

    const match = {
      matchId,
      name: matchName,
      isLive,
      teamOneId,
      teamTwoId,
      startTime: moment.utc(`2018-07-15 15:${matchStart}:00`),
      allEntities: concat(teamOne.data, teamTwo.data)
    };

    return match;
  };

  tick = () => {
    const { timeInsideMatch } = this.state;
    const { key, throttleAt } = queryString.parse(this.props.location.search);

    //Any player throttle
    const throttleSpecificEntityTime = moment.utc(
      `2018-07-15 15:${throttleAt}:00`
    );

    if (timeInsideMatch.isSame(throttleSpecificEntityTime)) {
      this.handleSpecificEntityClick(key);
    }

    this.setState({
      timeInsideMatch: timeInsideMatch.clone().add(1, "s")
    });

    //Work Left: Add a condition that start time > end time then match is finished
  };

  //Events
  getEventsUntil = async () => {
    const { matchId } = this.match;
    const { timeInsideMatch } = this.state;

    const events = await axios.get(`/api/match/events/${matchId}`, {
      params: {
        timeInsideMatch
      }
    });

    if (events.data) this.setState({ events: events.data });
  };

  //Trending Entities
  getTrendingEntities = async () => {
    // console.log(this.state.sortedTrendingEntities);
    const { matchId } = this.match;
    const { timeInsideMatch } = this.state;

    const dataForTrendingEntitiesCount = await axios.get(
      `/api/match/trending/${matchId}`,
      {
        params: {
          timeInsideMatch
        }
      }
    );

    const data = dataForTrendingEntitiesCount.data;
    if (!data) {
      return null;
    }

    const trendingEntitiesCount = data.until_now;

    let sortedTrendingEntities = null;

    if (isEmpty(this.state.trending.entities)) {
      sortedTrendingEntities = sort(
        (a, b) => b[1] - a[1],
        toPairs(trendingEntitiesCount)
      ).reduce((accumulator, currentValue, index) => {
        return {
          ...accumulator,
          [currentValue[0]]: {
            count: currentValue[1],
            difference: 0
          }
        };
      }, {});

      //   console.log("Intial Dict Set->", sortedTrendingEntities);
    } else {
      const unsortedTrendingEntities = {};

      Object.keys(trendingEntitiesCount).forEach(entity => {
        const prevDataForEntity = this.state.trending.entities[entity];

        if (prevDataForEntity) {
          const oldCount = prevDataForEntity.count;
          const newCount = trendingEntitiesCount[entity];
          const difference = newCount - oldCount;

          unsortedTrendingEntities[entity] = {
            ...prevDataForEntity,
            count: newCount,
            difference
          };
        } else {
          unsortedTrendingEntities[entity] = {
            count: trendingEntitiesCount[entity],
            difference: 0
          };
        }
      });

      sortedTrendingEntities = fromPairs(
        sort(
          (a, b) => b[1].difference - a[1].difference,
          toPairs(unsortedTrendingEntities)
        )
      );
    }

    this.setState(({ trending }) => {
      return {
        trending: {
          ...trending,
          entities: sortedTrendingEntities
        }
      };
    });
  };

  pollEntityTweets = entity => {
    const { matchId } = this.match;
    const { timeInsideMatch } = this.state;
    this.socket.emit("get entity tweets", timeInsideMatch, matchId, entity);
  };

  delay = (fn, timeout) => {
    clearTimeout(this.toggleTrendingOnVideo);
    this.toggleTrendingOnVideo = setTimeout(() => {
      fn();
    }, timeout);
  };

  hideTrending = () => {
    this.setState({
      trending: {
        ...this.state.trending,
        visible: false
      }
    });
  };

  showTrending = () => {
    this.setState({
      trending: {
        ...this.state.trending,
        visible: true
      }
    });
  };

  //Click Handlers
  handleSpecificEntityClick = entity => {
    console.log(entity);
    const entityData = this.match.allEntities.find(
      data => entity === data.entityName
    );
    this.setState({
      selectedEntity: {
        name: entity,
        tweets: [],
        image: entityData.entityImageURL
      }
    });

    clearInterval(this.specificEntityPollingTweetsInterval);

    this.specificEntityPollingTweetsInterval = setInterval(() => {
      console.log("getting called");
      this.pollEntityTweets(entity);
    }, 2000);

    this.pollEntityTweets(entity);
  };

  handleVideoPlayPause = () => {
    this.setState({
      video: {
        ...this.state.video,
        playing: !this.state.video.playing
      }
    });
  };

  handleVideoFullScreen = () => {
    this.setState({
      video: {
        ...this.state.video,
        playing: false,
        fullScreen: !this.state.video.fullScreen
      }
    });

    if (this.state.trending.visible) {
      this.delay(this.hideTrending, 5000);
    } else {
      this.showTrending();
    }
  };

  handleExitEntityViewOnVideo = () => {
    this.setState({
      selectedEntity: {
        name: "",
        tweets: [],
        image: ""
      }
    });

    this.showAndThenFadeTrending();
  };

  showAndThenFadeTrending = () => {
    this.showTrending();
    this.delay(this.hideTrending, 5000);
  };

  handleVideoClickOrTap = () => {
    this.showAndThenFadeTrending();
  };

  render() {
    if (this.state.startSimulation) {
      return (
        <MatchView
          timeInsideMatch={this.state.timeInsideMatch}
          matchData={this.match}
          stateOfVideo={this.state.video}
          events={this.state.events}
          trending={this.state.trending}
          emojis={this.state.emojis}
          selectedEntity={this.state.selectedEntity}
          onSpecificEntityClick={this.handleSpecificEntityClick}
          onPollEntityTweets={this.pollEntityTweets}
          onVideoPlayPause={this.handleVideoPlayPause}
          onVideoFullScreen={this.handleVideoFullScreen}
          onVideoClickOrTap={this.handleVideoClickOrTap}
          onExitEntityViewOnVideo={this.handleExitEntityViewOnVideo}
        />
      );
    }

    return null;
  }
}

export default Match;
