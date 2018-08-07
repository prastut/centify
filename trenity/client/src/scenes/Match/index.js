import React, { Component } from "react";
import moment from "moment";
import { isEmpty } from "ramda";

//API
import api from "../../api";
import openSocket from "socket.io-client";

//Containers
import SecondScreenExperience from "./SecondScreenExperience";
import VideoComponent from "./VideoComponent";

//UI Elements
import MatchNavBar from "../../components/MatchNavBar";
import EventsTimeline from "../../components/EventsTimeline";
import TrendingEntities from "../../components/TrendingEntities";
import ReactionFeed from "../../components/ReactionFeed";

//Assets
import "../../assets/css/swiper.min.css";
import Navbar from "../../components/Navbar/index";
import ScoreCard from "../../components/ScoreCard";
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

    //Timeouts
    this.toggleTrendingOnVideo = null;
    this.delayForPollingTweetTimeout = null;

    //MatchDataPacket
    this.match = {};

    //State
    this.state = {
      startSimulation: false,
      timeInsideMatch: "",
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
        src:
          "https://s3-ap-southeast-1.amazonaws.com/centify-trenity/13'+-+23'.mp4",
        muted: true,
        userActive: true,
        fullScreen: false,
        controls: true,
        inactivityTimeout: 2000
      }
    };
  }

  async componentDidMount() {
    //http://localhost:3000/match/CROFRA_FINAL?link=bit.ly/2JUMWHl&matchStart=13&key=Mario_Mandzukic&throttleAt=20
    try {
      const { matchId } = this.props.match.params;
      // const { matchStart } = queryString.parse(this.props.location.search);
      const matchStart = 13;

      this.setupSocket();
      this.match = await api.getMatchData(matchId, matchStart);
      //Video Link

      if (this.match.isLive) {
        //match is live
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
    //Any player throttle
    // const { key, throttleAt } = queryString.parse(this.props.location.search);

    const key = "Mario_Mandzukic";
    const throttleAt = 20;

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

    const events = await api.getEventsTillNow(matchId, timeInsideMatch);

    if (events) this.setState({ events });
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
    if (this.state.startSimulation) {
      const navbar = (
        <Navbar>
          <ScoreCard
            teamOne={this.match.teamOneId}
            teamTwo={this.match.teamTwoId}
            timeInsideMatch={this.state.timeInsideMatch}
          />
        </Navbar>
      );

      const events = <EventsTimeline events={this.state.events} />;

      const trending = (
        <TrendingEntities
          variant={this.state.video.fullScreen ? "onVideo" : "tiles"}
          selected={this.state.selectedEntity.name}
          trending={this.state.trending}
          emojis={this.state.emojis}
          allEntities={this.match.allEntities}
          onSpecificEntityClick={this.handleSpecificEntityClick}
        />
      );

      const reaction = (
        <ReactionFeed
          variant={this.state.video.fullScreen ? "onVideo" : "tiles"}
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
          <VideoComponent
            stateOfVideo={this.state.video}
            isSpecificEntityView={this.state.selectedEntity.name}
            trendingOnVideo={trending}
            reactionOnVideo={reaction}
            onVideoStatus={this.handleVideoStatus}
            onVideoUserStatus={this.handleVideoUserStatus}
            onVideoFullScreen={this.handleVideoFullScreen}
          />
        </SecondScreenExperience>
      );
    }

    return null;
  }
}

export default Match;
