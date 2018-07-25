import React, { Component } from "react";
import moment from "moment";
import { concat, isEmpty, toPairs, sort, fromPairs } from "ramda";

//API
import axios from "axios";
import openSocket from "socket.io-client";

import MatchView from "./MatchView";

//Assets
import "../../assets/css/swiper.min.css";
import video from "../../assets/video/sample_video.mp4";

class Match extends Component {
  constructor(props) {
    super(props);

    this.socket = null;

    //Intervals
    this.simulationMatchIntervalTimer = null;
    this.eventsInterval = null;
    this.trendingEntitiesInterval = null;
    this.emojisEntitiesInterval = null;
    this.specificEntityPollingTweetsInterval = null;

    //MatchDataPacket
    this.match = {};
    this.state = {
      startSimulation: false,
      timeInsideMatch: "",
      events: [],
      trendingEntities: {},
      emojis: {},
      selectedEntity: {
        name: "",
        tweets: []
      },
      video: {
        playing: false,
        fullScreen: false,
        src: video
      }
    };
  }

  async componentDidMount() {
    try {
      this.setupSocket();
      this.match = await this.getMatchData();

      if (this.match.isLive) {
        //match is live, directly simulate
      } else {
        //match is in the past, simulate it.

        this.setState({
          startSimulation: true,
          timeInsideMatch: this.match.startTime
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
      this.socket = openSocket("http://104.196.215.99:5000/");
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

    const matchPromise = await axios.get(`/api/match/data/${matchId}`);
    const {
      matchName,
      teamOneId,
      teamTwoId,
      startTime,
      isLive
    } = matchPromise.data;

    const teamOnePromise = axios.get(`/api/team/entities/${teamOneId}`);
    const teamTwoPromise = axios.get(`/api/team/entities/${teamTwoId}`);

    const [teamOne, teamTwo] = await Promise.all([
      teamOnePromise,
      teamTwoPromise
    ]);

    const match = {
      matchId,
      name: matchName,
      isLive,
      teamOneId,
      teamTwoId,
      startTime: moment.utc(startTime),
      allEntities: concat(teamOne.data, teamTwo.data)
    };

    return match;
  };

  tick = () => {
    const { timeInsideMatch } = this.state;
    //Add a condition that start time > end time then match is finished

    this.setState({
      timeInsideMatch: timeInsideMatch.clone().add(1, "s")
    });
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

    if (isEmpty(this.state.trendingEntities)) {
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
        const prevDataForEntity = this.state.trendingEntities[entity];

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
    this.setState({ trendingEntities: sortedTrendingEntities });
  };

  pollEntityTweets = entity => {
    const { matchId } = this.match;
    const { timeInsideMatch } = this.state;
    this.socket.emit("get entity tweets", timeInsideMatch, matchId, entity);
  };

  //Click Handlers
  handleSpecificEntityClick = entity => {
    //Clear pollingTweetsInterval if already set before
    clearInterval(this.specificEntityPollingTweetsInterval);

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

    this.specificEntityPollingTweetsInterval = setInterval(() => {
      //   console.log("getting called");
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
  };

  handleExitEntityViewOnVideo = () => {
    console.log("called");
    this.setState({
      selectedEntity: {
        name: "",
        tweets: [],
        image: ""
      }
    });
  };

  render() {
    if (this.state.startSimulation) {
      return (
        <MatchView
          timeInsideMatch={this.state.timeInsideMatch}
          matchData={this.match}
          stateOfVideo={this.state.video}
          events={this.state.events}
          trendingEntities={this.state.trendingEntities}
          emojis={this.state.emojis}
          selectedEntity={this.state.selectedEntity}
          onSpecificEntityClick={this.handleSpecificEntityClick}
          onVideoPlayPause={this.handleVideoPlayPause}
          onVideoFullScreen={this.handleVideoFullScreen}
          onExitEntityViewOnVideo={this.handleExitEntityViewOnVideo}
        />
      );
    }

    return null;
  }
}

export default Match;
