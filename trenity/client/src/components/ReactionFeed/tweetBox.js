import React from "react";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  tweetBox: {
    width: "calc(100vw*0.9)",
    margin: "0 auto",
    height: "100px",
    overflow: "auto",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "linear-gradient(0deg, #000000 0%, #505050 100%)"
  },
  tweetText: {
    color: "white",
    overflow: "auto",
    height: "100%",
    width: "calc(100%*0.9)",
    display: "flex",
    alignItems: "center"
  },
  adBanner: {
    width: "100%",
    height: "100%"
  }
};

const TweetBox = ({ classes, text, variant, imageToShow }) => {
  return (
    <div className={classes.tweetBox}>
      {variant === "text" && <div className={classes.tweetText}>{text}</div>}
      {variant === "ad" && (
        <img alt="ad-banner" src={imageToShow} className={classes.adBanner} />
      )}
    </div>
  );
};

export default withStyles(styles)(TweetBox);
