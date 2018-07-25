import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

//Material Styles
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
  }
};

const AutomationPanel = ({ classes, handleClick }) => (
  <Grid container justify="center" alignItems="center">
    <Grid item xs={12}>
      <p className={classes.headings}> AUTOMATION </p>
    </Grid>
    <Grid item xs={6}>
      <p>Simulate Match</p>
    </Grid>
    <Grid item xs={6}>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Start Match
      </Button>
    </Grid>
  </Grid>
);

const StyledAutomationPanel = withStyles(styles)(AutomationPanel);

class Dashboard extends Component {
  handleClick = index => {
    console.log("start match was clicked");

    fetch("/api/simulate-match-now", { method: "GET" })
      .then(function(response) {
        if (response.ok) {
          console.log("Match is started");
          return;
        }
        throw new Error("Request failed.");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Navbar text="Dashboard" />
        </Grid>
        <Grid item xs={12}>
          <StyledAutomationPanel handleClick={this.handleClick} />
        </Grid>
        <Grid item xs={12} />
      </Grid>
    );
  }
}

export default withStyles(styles)(Dashboard);
