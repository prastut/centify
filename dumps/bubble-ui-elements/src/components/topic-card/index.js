import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Emoji from "./emoji";
import Dhoni from "../../assets/images/dhoni.png";

const styles = {
  root: {
    position: "relative",
    height: "100%",
    width: "100%",
    borderRadius: "4px",
    background:
      "linear-gradient(0deg, rgba(75,78,94,1) 0%, rgba(75,78,94,1) 40%, rgba(112,114,133,1) 100%)",
    boxShadow: "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "scale(0.8)"
  },
  rootSelected: {
    position: "relative",
    height: "100%",
    width: "100%",
    borderRadius: "4px",
    background:
      "linear-gradient(0deg, rgba(75,78,94,1) 0%, rgba(75,78,94,1) 40%, rgba(112,114,133,1) 100%)",
    boxShadow: "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "scale(1)",
    transition: "all 0.5s ease"
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
    width: "100%",
    height: "auto",
    zIndex: "2"
  }
};

class TopicCard extends Component {
  render() {
    const {
      classes,
      entity,
      emoji,
      onEntityClick,
      index,
      selected
    } = this.props;

    const selectedStyles =
      index === selected ? classes.rootSelected : classes.root;

    return (
      <div className={selectedStyles} onClick={() => onEntityClick(index)}>
        <div className={classes.circle} />
        <img src={Dhoni} className={classes.image} alt={entity.name} />
        <Emoji emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(TopicCard);
