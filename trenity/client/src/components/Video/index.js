import React, { Component } from "react";
// import Fullscreenable from "react-fullscreenable";
import { withStyles } from "@material-ui/core/styles";

import VideoControls from "./VideoControls";

const styles = {
  root: {
    position: "relative",
    color: "white",
    overflow: "hidden"
  },
  video: {
    width: "100%",
    height: "100%"
  },
  playerButton: {
    background: "none",
    color: "white"
  },
  fullScreen: {
    height: "100%",
    background: "black"
  }
};

class Video extends Component {
  constructor(props) {
    super(props);
    this.video = React.createRef();
  }

  componentDidMount() {
    if (this.video) {
      this.props.onVideoPlayPause();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.stateOfVideo.playing !== prevProps.stateOfVideo.playing) {
      this.handlePlayerPlayPause();
    }

    if (this.props.isFullscreen !== prevProps.isFullscreen) {
      this.props.onVideoFullScreen();
    }
  }

  //   handleExitForSpecificEntityView = () => {
  //     this.setState({
  //       specificEntityView: {
  //         display: false,
  //         entity: null
  //       }
  //     });
  //   };

  //   handleEntryForSpecificEntityView = entity => {
  //     this.setState({
  //       specificEntityView: {
  //         display: true,
  //         entity
  //       }
  //     });
  //   };

  handleTap = () => {
    console.log("tap");
  };
  handleClick = () => {
    console.log("click");
  };

  handlePlayerPlayPause = () => {
    const method = this.props.stateOfVideo.playing ? "play" : "pause";
    this.video.current[method]();
  };

  render() {
    const {
      classes,
      stateOfVideo,
      onVideoPlayPause,
      onVideoClickOrTap,
      toggleFullscreen
    } = this.props;

    // const rootContainerStyles = isFullscreen
    //   ? [classes.root, classes.fullScreen].join(" ")
    //   : classes.root;

    if (stateOfVideo.fullScreen) {
      return (
        <React.Fragment>
          <video
            muted
            ref={this.video}
            className={classes.video}
            src={stateOfVideo.src}
            onClick={onVideoClickOrTap}
          />

          <VideoControls
            stateOfVideo={stateOfVideo}
            onVideoPlayPause={onVideoPlayPause}
            toggleFullscreenClick={toggleFullscreen}
          />
        </React.Fragment>
      );
    }

    return (
      <div className={classes.root}>
        <video
          muted
          ref={this.video}
          className={classes.video}
          src={stateOfVideo.src}
        />

        <VideoControls
          stateOfVideo={stateOfVideo}
          onVideoPlayPause={onVideoPlayPause}
          toggleFullscreenClick={toggleFullscreen}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Video);
