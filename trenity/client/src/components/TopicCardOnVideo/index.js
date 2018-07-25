import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Emoji from "./emoji";

const styles = {
  root: {
    position: "relative",
    height: "100%",
    width: "100%",
    backgroundImage: "linear-gradient(-180deg, #537895 0%, #09203F 100%)",
    borderRadius: 5,
    boxShadow: "0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)"
  },
  proportionateHeight: {
    height: "100%"
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
    borderRadius: "100%",
    height: "auto",
    padding: "5px",
    maxWidth: "50px",
    zIndex: "1"
  }
};

class TopicCardOnVideo extends Component {
  handleTopicCardClick = () => {
    this.props.onEntityClick(this.props.entityKey);
  };
  render() {
    const {
      classes,
      entityKey,
      entityImage,
      emoji,
      selectedEntity
    } = this.props;

    const selectedStyles = selectedEntity
      ? selectedEntity === entityKey
        ? classes.rootSelected
        : classes.root
      : classes.root;
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={selectedStyles}
        onClick={this.handleTopicCardClick}
      >
        <Grid item xs={8} className={classes.proportionateHeight}>
          <img src={entityImage} className={classes.image} alt={entityKey} />
          {emoji && <Emoji emoji={emoji} />}
        </Grid>
        <Grid item xs={4} />
      </Grid>
    );
  }
}

export default withStyles(styles)(TopicCardOnVideo);
