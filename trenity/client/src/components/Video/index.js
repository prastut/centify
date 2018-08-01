import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(
      this.videoNode,
      { ...this.props.options },
      function onPlayerReady() {}
    );

    this.player.on("fullscreenchange", () => {
      this.props.onVideoFullScreen();
    });

    this.player.on("useractive", () => {
      this.props.onVideoUserStatus("active");
    });

    this.player.on("userinactive", () => {
      this.props.onVideoUserStatus("inactive");
    });

    this.player.on("play", () => {
      this.props.onVideoStatus("play");
    });

    this.player.on("pause", () => {
      this.props.onVideoStatus("pause");
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
  render() {
    return (
      <div data-vjs-player className="Video">
        <video
          ref={node => (this.videoNode = node)}
          className="video-js vjs-16-9 vjs-big-play-centered"
        >
          <source src={this.props.options.src} type="video/mp4" />
        </video>
        {this.props.children}
      </div>
    );
  }
}

export default VideoPlayer;
