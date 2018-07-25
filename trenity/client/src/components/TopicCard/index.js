import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";

import Emoji from "./emoji";

const styles = {
  root: {
    position: "relative",
    height: "100%",
    width: "100%",
    backgroundImage: "linear-gradient(-180deg, #537895 0%, #09203F 100%)",
    borderRadius: "5px",
    boxShadow: "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  selected: {
    background:
      "linear-gradient(0deg, rgba(75,78,94,1) 0%, rgba(75,78,94,1) 40%, rgba(112,114,133,1) 100%)"
  },
  centerText: {
    textAlign: "center"
  },
  circle: {
    position: "absolute",
    width: "6em",
    height: "6em",
    background:
      "-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(82,113,255,1)), color-stop(1%, rgba(82,113,254,1)), color-stop(100%, rgba(87,117,251,1)))",
    borderRadius: "100%"
  },
  image: {
    width: "70%",
    borderRadius: "100%",
    height: "auto",
    zIndex: "1"
  },
  onVideoEntity: {
    flex: "0 1 40%"
  }
};

class TopicCard extends PureComponent {
  handleTopicCardClick = () => {
    this.props.onEntityClick(this.props.entityKey);
  };

  render() {
    const {
      classes,
      variant,
      entityKey,
      entityImage,
      emoji,
      selected
    } = this.props;

    const selectedStyles =
      selected === entityKey
        ? [classes.selected, classes.root].join(" ")
        : classes.root;

    if (variant === "onVideo") {
      return (
        <div className={selectedStyles} onClick={this.handleTopicCardClick}>
          <div className={classes.onVideoEntity}>
            <img src={entityImage} className={classes.image} alt={entityKey} />
            {emoji && <Emoji emoji={emoji} />}
          </div>
        </div>
      );
    }
    return (
      <div className={selectedStyles} onClick={this.handleTopicCardClick}>
        {/* <div className={classes.circle} /> */}
        <img src={entityImage} className={classes.image} alt={entityKey} />
        {emoji && <Emoji emoji={emoji} />}
      </div>
    );
  }
}

export default withStyles(styles)(TopicCard);
