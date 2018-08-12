import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    margin: "20px 0"
  },
  image: {
    width: "100%",
    borderRadius: "5px",
    boxShadow:
      "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)"
  }
};

const MatchTile = ({ classes, image, index, handleClick }) => (
  <div
    className={classes.root}
    onClick={() => (handleClick ? handleClick(index) : null)}
  >
    <img src={image} className={classes.image} alt="" />
  </div>
);

export default withStyles(styles)(MatchTile);
