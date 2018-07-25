import React from "react";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  tweetBox: {
    width: "calc(100vw*0.8)",
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
  }
};

const TweetBox = ({ classes, text }) => (
  <div className={classes.tweetBox}>
    <div className={classes.tweetText}>{text}</div>
  </div>
);

export default withStyles(styles)(TweetBox);
