import React, { Component } from "react";
import injectSheet from "react-jss";
import { breakPoints } from "../helper";

const styles = {
  wrapper: {
    height: "100%",
    width: "calc(100%*0.8)",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
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
    flex: "1 0 100%",
    maxWidth: "300px",
    maxHeight: "600px"
  },
  iphoneContainer: {
    display: "flex",
    justifyContent: "center",
    position: "absolute"
  },
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
      width: "100vw"
    },
    mockContainer: {
      width: "calc(100%*0.8)",
      marginTop: "60px",
      height: "510px"
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
  [`@media (${breakPoints.lg})`]: {
    root: {
      height: "100vh"
    },
    wrapper: {
      justifyContent: "space-around"
    },
    mockContainer: {
      flex: "1 0 50%"
    },
    descriptionContainer: {
      flex: "0 0 50%",
      textAlign: "left"
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
          <img src={mock} alt="iphone-potrait" className={classes.iphone} />
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
