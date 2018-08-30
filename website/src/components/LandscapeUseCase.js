import React, { Component } from "react";
import injectSheet from "react-jss";
import { breakPoints } from "../helper";
import Video from "./Video";

const mockSize = {
  width: 580,
  height: 280
};

const styles = {
  root: {
    height: "100%"
  },
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
    flexWrap: "wrap"
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
  mockDevice: props => ({
    backgroundImage: `url(${props.mock})`,
    width: mockSize.width,
    height: mockSize.height,
    position: "absolute",
    backgroundSize: [[mockSize.width, mockSize.height]],
    top: -20
  }),
  [`@media (${breakPoints.sm})`]: {
    descriptionContainer: {
      flex: "1 0 100%",
      textAlign: "center"
    },
    mockContainer: {
      flex: "1 0 100%"
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

class LandscapeUseCase extends Component {
  render() {
    const { classes, variant, video, heading, subheading } = this.props;

    const gif = (
      <div className={classes.mockContainer}>
        <Video src={video} customStyles={classes.video} />
        <div className={classes.mockDevice} />
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

export default injectSheet(styles)(LandscapeUseCase);
