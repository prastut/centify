import React, { Component } from "react";
import Fullscreenable from "react-fullscreenable";
//Material Styles

import { withStyles } from "@material-ui/core/styles";

//UI ELements
import MatchNavBar from "../../components/MatchNavBar";
import Video from "../../components/Video";
import EventsTimeline from "../../components/EventsTimeline";
import TrendingEntities from "../../components/TrendingEntities";
import ReactionFeed from "../../components/ReactionFeed";

const styles = {
  root: {
    color: "white",
    height: "100%",
    width: "100vw"
  },
  fullScreenRoot: {
    position: "relative",
    color: "white",
    overflow: "hidden",
    background: "black",
    height: "100%",
    width: "100%"
  },
  navbar: {
    height: "calc(100%*0.10)"
  },
  video: {
    width: "100%",
    height: "100%"
  },
  events: {
    padding: "20px 0",
    height: "calc(100%*0.10 - 20px)",
    minHeight: "95px"
  },
  trending: {
    height: "calc(100%*0.40)",
    width: "calc(100%*0.8)",
    margin: "0px auto",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  trendingFullScreen: {
    position: "absolute",
    bottom: "0",
    height: "calc(100%*0.15)",
    width: "100%",
    transform: "translateY(-40%)",
    zIndex: "1",
    background: "rgba(0,0,0,0.41)",
    display: "flex",
    alignItems: "center",
    overflowX: "scroll",
    opacity: 1,
    transition: "opacity 0.5s linear"
  },
  trendingFullScreenHidden: {
    position: "absolute",
    bottom: "0",
    height: "calc(100%*0.15)",
    width: "100%",
    transform: "translateY(-40%)",
    zIndex: "1",
    background: "rgba(0,0,0,0.41)",
    opacity: 0,
    transition: "opacity 0.5s linear"
  },
  headings: {
    fontSize: "0.8em",
    letterSpacing: "5px",
    flex: "1 0 30px"
  },
  centerPadding: {
    width: "calc(100vw*0.8)",
    margin: "0 auto"
  },
  reaction: {
    height: "calc(100%*0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },

  reactionFullScreen: {}
};

class MatchView extends Component {
  render() {
    const {
      classes,
      timeInsideMatch,
      matchData,
      stateOfVideo,
      events,
      trending,
      emojis,
      selectedEntity,
      onSpecificEntityClick,
      onCancelSpecificEntityView,
      onPollEntityTweets,
      onVideoPlayPause,
      onVideoFullScreen,
      onVideoClickOrTap,
      isFullscreen,
      toggleFullscreen,
      onExitEntityViewOnVideo
    } = this.props;

    const { teamOneId, teamTwoId, allEntities } = matchData;

    const rootStyles = stateOfVideo.fullScreen
      ? classes.fullScreenRoot
      : classes.root;

    /*
      Possible styles based on state
      1. stateOfVideo.fullScreen === false - show second screen experience style
      2. stateofVideo.fullScreen === true  - showing onVideo styles
         2.1 trending.visible === true - keep showin
         2.2 trending.visible === false - hide it. 

    */
    const trendingStyles = stateOfVideo.fullScreen
      ? trending.visible
        ? classes.trendingFullScreen
        : classes.trendingFullScreenHidden
      : classes.trending;

    const reactionStyles = stateOfVideo.fullScreen
      ? classes.reactionFullScreen
      : classes.reaction;

    return (
      <div className={rootStyles}>
        {!stateOfVideo.fullScreen && (
          <div className={classes.navbar}>
            <MatchNavBar
              teamOne={teamOneId}
              teamTwo={teamTwoId}
              timeInsideMatch={timeInsideMatch}
            />
          </div>
        )}
        <Video
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
          stateOfVideo={stateOfVideo}
          onSpecificEntityClick={onSpecificEntityClick}
          onVideoPlayPause={onVideoPlayPause}
          onVideoFullScreen={onVideoFullScreen}
          onVideoClickOrTap={onVideoClickOrTap}
        />
        {!stateOfVideo.fullScreen && (
          <div className={classes.events}>
            <EventsTimeline events={events} />
          </div>
        )}
        {!(stateOfVideo.fullScreen && selectedEntity.name) && (
          <div className={trendingStyles}>
            {!stateOfVideo.fullScreen && (
              <div
                className={[classes.headings, classes.centerPadding].join(" ")}
                onClick={onCancelSpecificEntityView}
              >
                TRENDING ENTITIES
              </div>
            )}
            <TrendingEntities
              variant={stateOfVideo.fullScreen ? "onVideo" : "tiles"}
              selected={selectedEntity.name}
              trending={trending}
              emojis={emojis}
              allEntities={allEntities}
              onSpecificEntityClick={onSpecificEntityClick}
            />
          </div>
        )}
        <div className={reactionStyles}>
          {!stateOfVideo.fullScreen && (
            <div
              className={[classes.headings, classes.centerPadding].join(" ")}
            >
              TWEET STREAM
            </div>
          )}
          <ReactionFeed
            variant={stateOfVideo.fullScreen ? "onVideo" : "tiles"}
            selectedEntity={selectedEntity}
            onPollEntityTweets={onPollEntityTweets}
            onExitEntityViewOnVideo={onExitEntityViewOnVideo}
          />
        </div>
      </div>
    );
  }
}

export default Fullscreenable()(withStyles(styles)(MatchView));
