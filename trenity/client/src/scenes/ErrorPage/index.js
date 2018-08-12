import React, { Component } from "react";
import { Link } from "react-router-dom";

//Material Styles
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

//UI ELements
import Navbar from "../../components/Navbar";

const styles = {
  root: {
    width: "calc(100vw*0.8)",
    maxWidth: "1000px",
    margin: "0 auto",
    color: "white"
  },
  headings: {
    fontSize: "0.8em",
    letterSpacing: "5px"
  },
  noLiveMatches: {
    height: 150,
    display: "flex",
    justifyContent: "center",
    fontSize: "0.8em",
    alignItems: "center"
  },
  brand: {
    fontSize: "1.5em"
  }
};

class ErrorPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Navbar>
            <Link to="/">
              <div className={classes.brand}>Trenity</div>
            </Link>
          </Navbar>
        </Grid>
        <Grid item xs={12}>
          404 not found :/
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ErrorPage);
