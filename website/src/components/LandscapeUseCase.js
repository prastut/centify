import React, { Component } from "react";
import injectSheet from "react-jss";
import { breakPoints } from "../helper";

const mockSize = {
  width: 580,
  height: 280
};

const styles = {
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
    flex: "0 0 80%",
    textAlign: "center",
    width: "calc(100vw*0.8)",
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
      marginTop: "30px",
      position: "relative"
    },
    video: {
      marginLeft: "calc( ( 100vw - ( 100vw*0.8 ) ) / 2 + 20px)"
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
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center"
    },
    descriptionContainer: {
      marginTop: "100px"
    },
    mockContainer: {
      marginTop: "50px",
      marginBottom: "100px",
      flex: "1 0 100%"
    },
    video: {
      marginLeft: "calc( ( 100vw - ( 100vw*0.8 ) ) / 2 + 20px)"
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
  [`@media (${breakPoints.lg})`]: {
    root: {
      height: "100vh",
      width: "calc(100vw*0.8)",
      margin: "0 auto"
    },
    descriptionContainer: {
      flex: "1 0 100%",
      alignItems: "center"
    },
    mockContainer: {
      flex: "1 0 100%",
      width: "100%",
      textAlign: "center"
    },
    landScapeVideoContainer: {
      width: "calc(100% - 80px)",
      overflow: "visible"
    },
    video: {
      marginLeft: "0",
      width: "100%",
      height: "100%",
      maxHeight: "370px",
      maxWidth: "740px"
    },
    iphoneContainer: {
      width: "100%",
      height: "auto",
      position: "absolute"
    },
    iphone: {
      height: "100%",
      marginLeft: "0"
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
          <img src={mock} alt="iphone-landscape" className={classes.iphone} />
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
