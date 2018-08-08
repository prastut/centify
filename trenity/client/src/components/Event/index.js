import React from "react";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import { eventsToEmoji } from "../../helper";

const styles = {
  root: {
    textAlign: "center"
  },
  emoji: {
    fontSize: "1.5em",
    margin: "0 0 5px 0"
  },
  time: {
    margin: 0
  }
};

const Event = ({ classes, eventObj }) => (
  <div className={classes.root}>
    <div className={classes.emoji}>
      {eventsToEmoji(eventObj.event.toUpperCase())}
    </div>
    <div className={classes.time}>
      {moment.utc(eventObj.timeStamp).format("m")}'
    </div>
  </div>
);

export default withStyles(styles)(Event);
