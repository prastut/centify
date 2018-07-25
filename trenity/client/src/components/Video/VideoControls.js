import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    display: "flex",
    position: "absolute",
    bottom: "0",
    width: "100%",
    flexWrap: "wrap",
    background: "rgba(0,0,0,0.5)",
    zIndex: 2,
    "& *": {
      flex: 1
    },
    "& button": {
      background: "none",
      border: 0,
      lineHeight: 1,
      color: "white",
      textAlign: "center",
      outline: 0,
      padding: 0,
      cursor: "pointer",
      minWidth: 40,
      minHeight: 20,
      fontSize: "1em"
    }
  },
  progress: {
    flex: 10,
    position: "relative",
    display: "flex",
    flexBasis: "60%",
    height: 5,
    transition: "height 0.3s",
    background: "rgba(0,0,0,0.5)",
    cursor: "ew-resize"
  }
};

class VideoControls extends Component {
  render() {
    const {
      classes,
      stateOfVideo,
      onVideoPlayPause,
      toggleFullscreenClick
    } = this.props;

    return (
      <div className={classes.root}>
        <button className={classes.playerButton} onClick={onVideoPlayPause}>
          {stateOfVideo.playing ? "►" : "❚ ❚"}
        </button>
        <div className={classes.progress}>
          <div className="progress__filled" />
        </div>
        <button onClick={toggleFullscreenClick}>[ ]</button>
        {/* <input
          type="range"
          name="volume"
          className={classes.slider}
          min={0}
          max={1}
          step={0.5}
          value="1"
        />
        <input
          type="range"
          name="playbackRate"
          className={classes.slider}
          min={0}
          max={1}
          value="1"
        /> */}
      </div>
    );
  }
}

export default withStyles(styles)(VideoControls);
