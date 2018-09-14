import React, { Component } from "react";
import { isEmpty, concat, uniqBy } from "ramda";
import moment from "moment";

//API
import api from "../../api";
import openSocket from "socket.io-client";

//Containers
import SecondScreen from "./SecondScreen";
import FullScreen from "./FullScreen";

//UI Elements
import EventsTimeline from "../../components/EventsTimeline";
import TrendingEntities from "../../components/TrendingEntities";
import ReactionFeed from "../../components/ReactionFeed";

//Assets
import "../../assets/css/swiper.min.css";
import Navbar from "../../components/Navbar/index";
import ScoreCard from "../../components/ScoreCard";

class View extends Component {
  constructor(props) {
    super(props);

    this.socket = null;

    //Intervals
    this.simulationMatchIntervalTimer = null;
    this.eventsInterval = null;
    this.trendingEntitiesInterval = null;
    this.emojisEntitiesInterval = null;

    //Timeouts
    this.toggleTrendingOnVideo = null;
    this.delayForPollingTweetTimeout = null;

    //MatchDataPacket
    this.match = {};

    //State
    this.state = {
      startRendering: false,
      timeInsideMatch: "",
      score: {},
      events: [],
      trending: {},
      emojis: {},
      selectedEntity: {
        key: "",
        tweets: [],
        imageURL: ""
      },
      fullScreen: false
    };
  }

  componentDidMount() {
    const { matchDetails } = this.props;

    console.log(matchDetails);

    //past
    //live
    let timeInsideMatch = null;

    const { matchState, startTime } = matchDetails;

    if (matchState === "past") {
      timeInsideMatch = moment.utc("2018-07-15T15:10:00.000Z");
    } else if (matchState === "live") {
      timeInsideMatch = moment.utc();
    }

    this.setupSocket();
    this.setupSocketListeners();

    this.setState(prevState => {
      return {
        startRendering: true,
        timeInsideMatch,
        score: {
          [matchDetails.teams.teamOne.acronym]: 0,
          [matchDetails.teams.teamTwo.acronym]: 0
        },
        fullScreen: matchDetails.fullScreen
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.startRendering !== prevState.startRendering) {
      //First Time Run
      this.setupIntervals();
      this.firstTimeFire();
    }

    //Events
    if (this.state.events > prevState.events) {
      const allGoalEvents = this.state.events.filter(e => e.event === "GOAL");
      const lastGoalEvent = allGoalEvents[allGoalEvents.length - 1];

      if (lastGoalEvent) this.setState({ score: lastGoalEvent.score });
    }

    if (this.state.selectedEntity.key !== prevState.selectedEntity.key) {
      console.log(this.state.selectedEntity);
      this.pollEntityTweets();
    }
  }

  componentWillUnmount() {
    this.socket.close();

    //Clearing Timeouts
    clearTimeout(this.delayForPollingTweetTimeout);

    //Clearing Intervals
    clearInterval(this.simulationMatchIntervalTimer);
    clearInterval(this.eventsInterval);
    clearInterval(this.trendingEntitiesInterval);
    clearInterval(this.emojisEntitiesInterval);
  }

  firstTimeFire = () => {
    this.getTrendingEntities();
    this.getEventsUntilNow();
  };

  //Sockets
  setupSocket = () => {
    if (window.location.href.split("//")[1].split(":")[0] === "localhost") {
      this.socket = openSocket(api.socket.dev);
    } else {
      this.socket = openSocket(api.socket.production);
    }
  };

  setupIntervals = () => {
    const throttleRate = {
      timer: 1,
      events: 1,
      trending: 10,
      emojis: 2
    };

    this.simulationMatchIntervalTimer = setInterval(
      this.tick,
      throttleRate.timer * 1000
    );

    this.eventsInterval = setInterval(
      this.getEventsUntilNow,
      throttleRate.events * 1000
    );

    this.trendingEntitiesInterval = setInterval(
      this.getTrendingEntities,
      throttleRate.trending * 1000
    );

    this.emojisEntitiesInterval = setInterval(() => {
      this.socket.emit(
        "get trending emojis",
        this.state.timeInsideMatch,
        this.props.matchDetails.matchId
      );
    }, throttleRate.emojis * 1000);
  };

  setupSocketListeners = () => {
    this.socket.on("trending emojis", trendingEmojis => {
      this.setState(prevState => ({
        emojis: {
          ...prevState.emojis,
          ...trendingEmojis
        }
      }));
    });

    this.socket.on("entity tweets", newTweets => {
      if (isEmpty(newTweets)) {
        console.log("Empty Result, poll again");
        this.delayForPollingTweetTimeout = setTimeout(
          this.pollEntityTweets,
          2000
        );
      } else {
        const prevTweets = this.state.selectedEntity.tweets;
        const allTweets = concat(prevTweets, newTweets);
        const uniqueTweets = uniqBy(tweet => tweet.tweet, allTweets);

        this.setState(({ selectedEntity }) => ({
          selectedEntity: {
            ...selectedEntity,
            tweets: uniqueTweets
          }
        }));
      }
    });
  };

  //Setting Up Match

  tick = () => {
    this.setState(prevState => ({
      timeInsideMatch: prevState.timeInsideMatch.clone().add(1, "s")
    }));

    //Work Left: Add a condition that start time > end time then match is finished
  };

  getEventsUntilNow = async () => {
    const { matchId, startTime } = this.props.matchDetails;
    const { timeInsideMatch } = this.state;

    const UTCStartTime = moment.utc(startTime);

    const events = await api.getEvents(matchId, timeInsideMatch);

    const filteredNullEvents = events.filter(
      e => e.event && moment.utc(e.timeStamp).isAfter(UTCStartTime)
    );

    const updatedEvents = filteredNullEvents.map(e => {
      return {
        ...e,
        relativeTime: moment.utc(e.timeStamp).diff(UTCStartTime, "M")
      };
    });

    if (this.state.events.length < updatedEvents.length) {
      this.setState({ events: updatedEvents });
    }
  };

  //Trending Entities
  getTrendingEntities = async () => {
    const { matchId } = this.props.matchDetails;
    const { timeInsideMatch } = this.state;

    const trending = await api.getTrendingEntities(
      matchId,
      timeInsideMatch,
      this.state.trending
    );

    if (!isEmpty(trending)) this.setState({ trending });
  };

  pollEntityTweets = () => {
    const { matchId } = this.props.matchDetails;
    const { timeInsideMatch, selectedEntity } = this.state;

    const gap = 2;

    this.socket.emit(
      "get entity tweets",
      timeInsideMatch,
      matchId,
      selectedEntity.key,
      gap
    );
  };

  changeSpecificEntityState = entityKey => {
    const { imageURL } = this.props.matchDetails.allEntities.find(
      e => e.key === entityKey
    );

    this.setState({
      selectedEntity: {
        key: entityKey,
        tweets: [],
        imageURL
      }
    });
  };

  resetSpecificEntityState = () => {
    clearTimeout(this.delayForPollingTweetTimeout);
    this.setState({
      selectedEntity: {
        key: "",
        tweets: [],
        imageURL: ""
      }
    });
  };

  //Click Handlers
  handleSpecificEntityClick = entityKey => {
    this.changeSpecificEntityState(entityKey);
  };

  render() {
    const { matchDetails } = this.props;

    const generalUIVariant = this.state.fullScreen ? "onVideo" : "tiles";

    if (this.state.startRendering) {
      const navbar = (
        <Navbar>
          <ScoreCard
            teamOne={matchDetails.teams.teamOne.acronym}
            teamTwo={matchDetails.teams.teamTwo.acronym}
            score={this.state.score}
            timeInsideMatch={this.state.timeInsideMatch}
          />
        </Navbar>
      );

      const events = <EventsTimeline events={this.state.events} />;

      const trending = (
        <TrendingEntities
          variant={generalUIVariant}
          selected={this.state.selectedEntity.key}
          trending={this.state.trending}
          emojis={this.state.emojis}
          allEntities={matchDetails.allEntities}
          onSpecificEntityClick={this.handleSpecificEntityClick}
        />
      );
      const reaction = (
        <ReactionFeed
          variant={generalUIVariant}
          selectedEntity={this.state.selectedEntity}
          onPollEntityTweets={this.pollEntityTweets}
          onResetSpecificEntityState={this.resetSpecificEntityState}
        />
      );

      if (this.state.fullScreen) {
        return (
          <FullScreen
            isSpecificEntityView={this.state.selectedEntity.key}
            trending={trending}
            reaction={reaction}
          />
        );
      }

      return (
        <SecondScreen
          navbar={navbar}
          events={events}
          trending={trending}
          reaction={reaction}
        />
      );
    }

    return <h1>Hello World</h1>;
  }
}

export default View;
