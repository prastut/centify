import React from "react";
import injectSheet from "react-jss";

import Video from "./Video";

const styles = {
  video: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.2,
    zIndex: -99999
  }
};

const BackGroundVideo = ({ classes, src }) => (
  <Video src={src} customStyles={classes.video} />
);

export default injectSheet(styles)(BackGroundVideo);
