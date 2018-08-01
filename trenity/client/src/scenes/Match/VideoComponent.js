import React, { Component } from "react";
//Material Styles

import { withStyles } from "@material-ui/core/styles";

//UI ELements
import Video from "../../components/Video";

const styles = {
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
    overflowX: "scroll"
  },
  show: {
    opacity: 1,
    visibility: "visible",
    transition: "visibility 0s, opacity 1.5s linear"
  },
  hide: {
    visibility: "hidden",
    opacity: 0,
    transition: "visibility 0s, opacity 1.5s linear"
  }
};

class VideoComponent extends Component {
  renderVideoChildren = () => {
    const {
      classes,
      stateOfVideo,
      isSpecificEntityView,
      trendingOnVideo,
      reactionOnVideo
    } = this.props;

    console.log("yp");

    const trendingContainerStyles = stateOfVideo.userActive
      ? [classes.trendingFullScreen, classes.show].join(" ")
      : [classes.trendingFullScreen, classes.hide].join(" ");

    if (isSpecificEntityView) {
      return reactionOnVideo;
    }

    return <div className={trendingContainerStyles}>{trendingOnVideo}</div>;
  };

  render() {
    const {
      stateOfVideo,
      onVideoStatus,
      onVideoUserStatus,
      onVideoFullScreen
    } = this.props;

    return (
      <Video
        options={stateOfVideo}
        onVideoStatus={onVideoStatus}
        onVideoUserStatus={onVideoUserStatus}
        onVideoFullScreen={onVideoFullScreen}
      >
        {stateOfVideo.fullScreen && this.renderVideoChildren()}
      </Video>
    );
  }
}

export default withStyles(styles)(VideoComponent);
