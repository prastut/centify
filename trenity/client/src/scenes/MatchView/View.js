import React, { Component } from "react";
import { isEmpty } from "ramda";
import moment from "moment";

//API
import api from "../../api";
import openSocket from "socket.io-client";

//Containers
import SecondScreenExperience from "./SecondScreenExperience";
import VideoComponent from "./VideoComponent";

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
      video: {
        autoplay: true,
        playing: false,
        src: "",
        muted: true,
        userActive: true,
        fullScreen: false,
        controls: true,
        inactivityTimeout: 2000
      }
    };
  }

  componentDidMount() {
    const { matchDetails } = this.props;
    const { isDemo } = matchDetails;

    //Demo
    //past
    //live
    let timeInsideMatch = null;

    if (isDemo) {
      const { demoStartTime } = matchDetails;

      timeInsideMatch = demoStartTime;
    } else {
      const { matchState, startTime } = matchDetails;

      if (matchState === "past") {
        timeInsideMatch = moment.utc(startTime);
      } else if (matchState === "live") {
        timeInsideMatch = moment.utc();
      }
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
        video: {
          ...prevState.video,
          src: matchDetails.video ? matchDetails.video : ""
        }
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
    if (this.state.events.length > prevState.events.length) {
      const updatedEvents = this.state.events;
      const updatedEventsLength = updatedEvents.length;
      const lastEventinUpdatedEvents = updatedEvents[updatedEventsLength - 1];
      const { scoringTeam, event } = lastEventinUpdatedEvents;
      if (event === "Goal") {
        this.setState(prevState => {
          return {
            score: {
              ...prevState.score,
              [scoringTeam]: prevState.score[scoringTeam] + 1
            }
          };
        });
      }
    }

    //
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

    // this.eventsInterval = setInterval(
    //   this.getEventsUntilNow,
    //   throttleRate.events * 1000
    // );

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

    this.socket.on("entity tweets", tweets => {
      if (isEmpty(tweets)) {
        console.log("Empty Result, poll again");
        this.delayForPollingTweetTimeout = setTimeout(
          this.pollEntityTweets,
          2000
        );
      } else {
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

  tick = () => {
    // //Any player throttle
    // // const { key, throttleAt } = queryString.parse(this.props.location.search);

    // const key = "Mario_Mandzukic";
    // const throttleAt = 20;

    // const throttleSpecificEntityTime = moment.utc(
    //   `2018-07-15 15:${throttleAt}:00`
    // );

    // if (timeInsideMatch.isSame(throttleSpecificEntityTime)) {
    //   this.handleSpecificEntityClick(key);
    // }

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

    const filteredNullEvents = events.filter(e => e.event);

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

  handleVideoStatus = status => {
    this.setState(({ video }) => {
      return {
        video: {
          ...video,
          playing: status === "play"
        }
      };
    });
  };

  handleVideoUserStatus = status => {
    this.setState(({ video }) => {
      return {
        video: {
          ...video,
          userActive: status === "active"
        }
      };
    });
  };

  handleVideoFullScreen = () => {
    this.setState(({ video }) => {
      return {
        video: {
          ...video,
          fullScreen: !video.fullScreen
        }
      };
    });

    this.resetSpecificEntityState();
  };

  render() {
    const { matchDetails } = this.props;

    const generalUIVariant = this.state.video.fullScreen ? "onVideo" : "tiles";
    const trendingUIVariant =
      generalUIVariant === "onVideo"
        ? "onVideo"
        : this.state.video.src
          ? "carousel"
          : "tiles";

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
          variant={trendingUIVariant}
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
      return (
        <SecondScreenExperience
          isFullScreen={this.state.video.fullScreen}
          navbar={navbar}
          events={events}
          trending={trending}
          reaction={reaction}
        >
          {this.state.video.src && (
            <VideoComponent
              stateOfVideo={this.state.video}
              isSpecificEntityView={this.state.selectedEntity.key}
              trendingOnVideo={trending}
              reactionOnVideo={reaction}
              onVideoStatus={this.handleVideoStatus}
              onVideoUserStatus={this.handleVideoUserStatus}
              onVideoFullScreen={this.handleVideoFullScreen}
            />
          )}
        </SecondScreenExperience>
      );
    }

    return <h1>Hello World</h1>;
  }
}

export default View;
