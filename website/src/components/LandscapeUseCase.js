import React, { Component } from "react";
import injectSheet from "react-jss";
import { breakPoints } from "../helper";
import Video from "./Video";

const mockSize = {
  width: 580,
  height: 280
};

const styles = {
  root: {},
  wrapper: {
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
    width: "calc(100%*0.8)",
    margin: "0 auto"
  },
  descriptionItems: {
    flex: "1 0 100%"
  },
  mockContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  video: {
    width: 516,
    height: 238
  },
  landScapeVideoContainer: {
    width: "100vw",
    overflow: "hidden"
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
    root: {
      height: "100vh"
    },
    mockContainer: {
      marginTop: "20px",
      position: "relative"
    },
    iphoneContainer: {
      width: "100vw",
      height: "270px",
      overflow: "hidden",
      position: "absolute"
    },
    iphone: {
      height: "100%",
      marginLeft: "calc( ( 100vw - ( 100vw*0.8 ) ) / 2 )"
    }
  },
  [`@media (${breakPoints.sm})`]: {
    descriptionContainer: {
      flex: "1 0 100%",
      textAlign: "center"
    },
    mockContainer: {
      flex: "1 0 100%"
    },
    video: {
      marginLeft: "calc( ( 100vw - ( 100vw*0.8 ) ) / 2 + 20px)"
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

const LandScapeVideo = ({ src, height, width, customStyles }) => (
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

class LandscapeUseCase extends Component {
  render() {
    const { classes, variant, video, heading, subheading, mock } = this.props;

    const gif = (
      <div className={classes.mockContainer}>
        <div className={classes.landScapeVideoContainer}>
          <LandScapeVideo src={video} customStyles={classes.video} />
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
    );
  }
}

export default injectSheet(styles)(LandscapeUseCase);
