import React, { Component } from "react";
import injectSheet from "react-jss";
import { breakPoints } from "../helper";
import Video from "./Video";

const mockSize = {
  width: 280,
  height: 580
};

const styles = {
  wrapper: {
    height: "100%",
    width: "calc(100%*0.8)",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center"
  },
  box: {
    height: "calc(100vh*0.8)",
    background: "white",
    border: "3px solid cornflowerblue"
  },
  descriptionContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: "1 0 100%",
    textAlign: "center"
  },
  descriptionItems: {
    flex: "1 0 100%"
  },
  mockContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flex: "1 0 100%"
  },
  iphoneContainer: {
    display: "flex",
    justifyContent: "center",
    position: "absolute"
  },
  mockDevice: props => ({
    backgroundImage: `url(${props.mock})`,
    width: mockSize.width,
    height: mockSize.height,
    position: "absolute",
    backgroundSize: [[mockSize.width, mockSize.height]],
    top: -20
  }),
  [`@media (${breakPoints.xs})`]: {
    videoContainer: {
      height: "100vh"
    },
    video: {
      width: "220px",
      height: "100vh"
    },
    iphoneContainer: {
      width: "100vw",
      height: "100vh"
    },
    iphone: {
      height: "100%"
    }
  },
  [`@media (${breakPoints.sm})`]: {
    root: {
      height: "calc(100vh + 30px)",
      width: "100vw"
    },
    mockContainer: {
      width: "calc(100%*0.8)"
    },
    videoContainer: {
      width: "calc(100% - 20px)"
    },
    video: {
      width: "100%",
      height: "auto"
    },
    iphoneContainer: {
      width: "100%"
    },
    iphone: {
      width: "100%",
      height: "100%"
    }
  },
  [`@media (${breakPoints.md})`]: {
    mockContainer: {
      flex: "1 0 50%"
    },
    descriptionContainer: {
      flex: "1 0 50%"
    }
  }
};
const PotraitVideo = ({ src, height, width, customStyles }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: `
					  <video
						  muted
						  autoplay
						  playsinline
						  loop
						  class="${customStyles}""
						  src="${src}"
					  />
			  `
    }}
  />
);

class PotraitUseCase extends Component {
  render() {
    const { classes, variant, video, heading, subheading, mock } = this.props;

    const gif = (
      <div className={classes.mockContainer}>
        <div className={classes.videoContainer}>
          <PotraitVideo src={video} customStyles={classes.video} />
        </div>
        <div className={classes.iphoneContainer}>
          <img src={mock} className={classes.iphone} />
        </div>
      </div>
    );

    const description = (
      <div className={classes.descriptionContainer}>
        <h2 className={classes.descriptionItems}>{heading}</h2>
        <p className={classes.descriptionItems}>{subheading}</p>
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          {variant === "right" || variant === "bottom" ? (
            <React.Fragment>
              {description}
              {gif}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {gif}
              {description}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(PotraitUseCase);
