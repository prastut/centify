import React from "react";
import injectSheet from "react-jss";

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
  <div
    dangerouslySetInnerHTML={{
      __html: `
<video
  muted
  autoplay
  playsinline
  loop
  class="${classes.video}""
  src="${src}"
/>
`
    }}
  />
);

export default injectSheet(styles)(BackGroundVideo);
