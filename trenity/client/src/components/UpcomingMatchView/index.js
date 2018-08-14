import React from "react";
import { withStyles } from "@material-ui/core/styles";
// import moment from "moment";

const styles = {
  userContainer: {
    height: "60px",
    width: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  userSelected: {
    position: "relative"
  },
  userFaded: {
    position: "relative",
    opacity: "0.5"
  },
  userImage: {
    width: "20px",
    height: "20px",
    borderRadius: "100%",
    position: "absolute",
    bottom: "0",
    right: "0",
    marginRight: "-0.4em"
  },
  emoji: {
    fontSize: "2em"
  }
};

const UpcomingMatchView = ({ classes, matchDetails }) => {
  console.log(matchDetails);
  return <div> Yo</div>;
};

export default withStyles(styles)(UpcomingMatchView);
