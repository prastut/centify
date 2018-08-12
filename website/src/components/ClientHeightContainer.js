import React from "react";
import injectSheet from "react-jss";

const styles = {
  root: {
    height: "100vh",
    maxHeight: "800px"
  }
};

const ClientHeightContainer = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
);

export default injectSheet(styles)(ClientHeightContainer);
