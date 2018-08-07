import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    position: "relative",
    height: "100%",
    width: "100%",
    backgroundImage: "linear-gradient(-180deg, #537895 0%, #09203F 100%)",
    borderRadius: "5px",
    boxShadow: "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  rootOnVideo: {
    position: "relative",
    height: "100%",
    width: "100%",
    backgroundImage: "linear-gradient(-180deg, #537895 0%, #09203F 100%)",
    borderRadius: "5px",
    boxShadow: "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  selected: {
    background:
      "linear-gradient(0deg, rgba(75,78,94,1) 0%, rgba(75,78,94,1) 40%, rgba(112,114,133,1) 100%)"
  },
  centerText: {
    textAlign: "center"
  },

  imageContainer: {
    height: "auto",
    width: "70%"
  },
  imageContainerOnVideo: {
    width: "30%",
    height: "auto",
    flex: "1 0 70%",
    display: "flex",
    alignItems: "center"
  },
  image: {
    width: "100%",
    borderRadius: "100%",
    height: "auto",
    zIndex: "1"
  },
  sentimentBar: {
    width: "80%",
    flex: "1 0 30%",
    display: "flex",
    alignItems: "center"
  }
};

const TopicCard = ({
  classes,
  variant,
  entityKey,
  entityImage,
  selected,
  onEntityClick,
  emojiComponent,
  sentimentBarComponent
}) => {
  const rootStyles =
    variant === "onVideo"
      ? classes.rootOnVideo
      : selected === entityKey
        ? [classes.selected, classes.root].join(" ")
        : classes.root;

  const imageContainerStyles =
    variant === "onVideo"
      ? classes.imageContainerOnVideo
      : classes.imageContainer;

  return (
    <div className={rootStyles} onClick={() => onEntityClick(entityKey)}>
      {/* <div className={classes.circle} /> */}
      <div className={imageContainerStyles}>
        <img src={entityImage} className={classes.image} alt={entityKey} />
      </div>
      {emojiComponent}

      {variant === "onVideo" && (
        <div className={classes.sentimentBar}> {sentimentBarComponent} </div>
      )}
    </div>
  );
};

export default withStyles(styles)(TopicCard);
