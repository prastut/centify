import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  dot: {
    height: 15,
    width: 15,
    margin: "0 10px",
    backgroundColor: "white",
    borderRadius: "50%"
  },
  dotSelected: {
    border: "3px solid cornflowerblue"
  }
};

const Dot = ({ classes, index, selected, onDotClick }) => (
  <span
    className={
      index === selected
        ? [classes.dot, classes.dotSelected].join(" ")
        : classes.dot
    }
    onClick={() => onDotClick(index)}
  />
);

export default withStyles(styles)(Dot);