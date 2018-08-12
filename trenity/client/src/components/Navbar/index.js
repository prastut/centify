import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    width: "calc(100vw*0.8)",
    height: "calc(100vh*0.10)",
    maxWidth: "1000px",
    maxHeight: "70px",
    margin: "0 auto",
    color: "white",
    display: "flex",
    alignItems: "center"
  }
};

const Navbar = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
);

export default withStyles(styles)(Navbar);
