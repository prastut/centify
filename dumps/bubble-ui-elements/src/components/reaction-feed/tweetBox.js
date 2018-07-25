import React from "react";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  tweetBox: {
    margin: "0 auto",
    height: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "3px",
    background:
      "linear-gradient(0deg, rgba(76,78,92,1) 0%, rgba(75,77,91,1) 40%, rgba(75,77,91,1) 100%)"
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
