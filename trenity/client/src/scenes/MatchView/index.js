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

//Helper Utitilies
import { timeInsideMatchBasedOnMatchState } from "../../helper";

class Match extends Component {
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
      matchStarted: false,
      timeInsideMatch: "",
      score: {},
      events: [],
      trending: {
        entities: {}
      },
      emojis: {},
      selectedEntity: {
        name: "",
        tweets: [],
        image: ""
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

  async componentDidMount() {
    try {
      const {
        url,
        params: { matchId }
      } = this.props.match;

      const isDemo = url.split("/")[1] === "demo";

      let timeInsideMatch = null;

      if (isDemo) {
        const { search } = this.props.location;

        const variant = search.split("=")[1];

        const matchDetails = await api.getAllMatchDetails(matchId);
        const demoDetails = api.getDemoDetails(matchId, variant);

        this.match = {
          ...matchDetails,
          ...demoDetails
        };

        // this.match = api.getDemoData(matchId)
      } else {
        this.match = await api.getMatchVerboseDetails(matchId);

        console.log(this.match);
        timeInsideMatch = timeInsideMatchBasedOnMatchState(
          this.match.matchState
        );
      }

      this.setupSocket();
      this.setupSocketListeners();

      this.setState(prevState => {
        return {
          matchStarted: true,
          timeInsideMatch,
          score: {
            [this.match.teams.teamOne.key]: 0,
            [this.match.teams.teamTwo.key]: 0
          },
          video: {
            ...prevState.video,
            src: this.match.video ? this.match.video : ""
          }
        };
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.matchStarted !== prevState.matchStarted) {
      //First Time Run
      // this.setupIntervals();
      // this.firstTimeFire();
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
      this.getEventsUntil,
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
        this.match.matchId
      );
    }, throttleRate.emojis * 1000);
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
    const { timeInsideMatch } = this.state;
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

    this.setState({
      timeInsideMatch: timeInsideMatch.clone().add(1, "s")
    });

    //Work Left: Add a condition that start time > end time then match is finished
  };

  //Events
  getEventsUntil = async () => {
    const { matchId } = this.match;
    const { timeInsideMatch } = this.state;

    const events = await api.getEventsTillNow(matchId, timeInsideMatch);

    if (events) {
      if (events.length > this.state.events.length) {
        const goalHappened = events.find(e => e.event === "Goal");

        if (goalHappened) {
          const { scoringTeam } = goalHappened;
          console.log(scoringTeam);

          this.setState(({ score }) => {
            return {
              score: {
                ...score,
                [scoringTeam]: score[scoringTeam] + 1
              }
            };
          });
        }
      }

      this.setState({ events });
    }
  };

  //Trending Entities
  getTrendingEntities = async () => {
    const { matchId } = this.match;
    const { timeInsideMatch } = this.state;

    const entities = await api.getTrendingEntities(
      matchId,
      timeInsideMatch,
      this.state.trending.entities
    );

    // console.log(entities);

    if (entities) {
      this.setState(({ trending }) => {
        return {
          trending: {
            ...trending,
            entities
          }
        };
      });
    }
  };

  pollEntityTweets = () => {
    const { matchId } = this.match;
    const { timeInsideMatch, selectedEntity } = this.state;

    const gap = 2;

    this.socket.emit(
      "get entity tweets",
      timeInsideMatch,
      matchId,
      selectedEntity.name,
      gap
    );
  };

  changeSpecificEntityState = entity => {
    const entityData = this.match.allEntities.find(
      data => entity === data.entityName
    );

    //Move Poll Entity to ComponentDidUpdate
    this.setState(
      {
        selectedEntity: {
          name: entity,
          tweets: [],
          image: entityData.entityImageURL
        }
      },
      () => this.pollEntityTweets()
    );
  };

  resetSpecificEntityState = () => {
    clearTimeout(this.delayForPollingTweetTimeout);
    this.setState({
      selectedEntity: {
        name: "",
        tweets: [],
        image: ""
      }
    });
  };

  //Click Handlers
  handleSpecificEntityClick = entity => {
    this.changeSpecificEntityState(entity);
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
    if (this.state.matchStarted) {
      // const navbar = (
      //   <Navbar>
      //     <ScoreCard
      //       teamOne={this.match.teams.teamOne}
      //       teamTwo={this.match.teams.teamTwo}
      //       score={this.state.score}
      //       timeInsideMatch={this.state.timeInsideMatch}
      //     />
      //   </Navbar>
      // );
      // const events = <EventsTimeline events={this.state.events} />;
      // const trending = (
      //   <TrendingEntities
      //     variant={this.state.video.fullScreen ? "onVideo" : "tiles"}
      //     selected={this.state.selectedEntity.name}
      //     trending={this.state.trending}
      //     emojis={this.state.emojis}
      //     allEntities={this.match.allEntities}
      //     onSpecificEntityClick={this.handleSpecificEntityClick}
      //   />
      // );
      // const reaction = (
      //   <ReactionFeed
      //     variant={this.state.video.fullScreen ? "onVideo" : "tiles"}
      //     selectedEntity={this.state.selectedEntity}
      //     onPollEntityTweets={this.pollEntityTweets}
      //     onResetSpecificEntityState={this.resetSpecificEntityState}
      //   />
      // );
      // return (
      //   <SecondScreenExperience
      //     isFullScreen={this.state.video.fullScreen}
      //     navbar={navbar}
      //     events={events}
      //     trending={trending}
      //     reaction={reaction}
      //   >
      //     {this.state.video.src && (
      //       <VideoComponent
      //         stateOfVideo={this.state.video}
      //         isSpecificEntityView={this.state.selectedEntity.name}
      //         trendingOnVideo={trending}
      //         reactionOnVideo={reaction}
      //         onVideoStatus={this.handleVideoStatus}
      //         onVideoUserStatus={this.handleVideoUserStatus}
      //         onVideoFullScreen={this.handleVideoFullScreen}
      //       />
      //     )}
      //   </SecondScreenExperience>
      // );
    }

    return <h1>Hello World</h1>;
  }
}

export default Match;
