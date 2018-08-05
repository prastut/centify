import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    height: "100vh",
    maxHeight: "800px"
  }
};

const ClientHeightContainer = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
);

export default withStyles(styles)(ClientHeightContainer);
