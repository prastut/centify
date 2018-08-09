import React, { Component } from "react";
import injectSheet from "react-jss";
import { breakPoints } from "../helper";

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
  gifContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  [`@media (${breakPoints.sm})`]: {
    descriptionContainer: {
      flex: "1 0 100%",
      textAlign: "center"
    },
    gifContainer: {
      flex: "1 0 100%"
    }
  },
  [`@media (${breakPoints.md})`]: {
    gifContainer: {
      flex: "1 0 50%"
    },
    descriptionContainer: {
      flex: "1 0 50%"
    }
  }
};

class DisplayUseCaseBasic extends Component {
  render() {
    const { classes, imagePosition, heading, subheading, image } = this.props;

    const gif = (
      <div className={classes.gifContainer}>
        <img src={image} alt="" />
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
          {imagePosition === "right" || imagePosition === "bottom" ? (
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

export default injectSheet(styles)(DisplayUseCaseBasic);
