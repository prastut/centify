import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "ramda";

//Material Styles
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

//API
import api from "../../api";

//UI ELements
import Navbar from "../../components/Navbar";
import MatchTile from "../../components/MatchTile";

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

class FixturesDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liveMatches: [],
      pastMatches: []
    };
  }

  async componentDidMount() {
    const fixtures = await api.getAllFixtures();

    this.setState({
      liveMatches: fixtures.filter(m => m.isLive),
      pastMatches: fixtures.filter(m => !m.isLive)
    });
  }

  render() {
    const { classes, match } = this.props;

    console.log(match);

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Navbar>
            <div className={classes.brand}>Trenity</div>
          </Navbar>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <div className={classes.headings}> LIVE </div>
              {isEmpty(this.state.liveMatches) ? (
                <div className={classes.noLiveMatches}>
                  No live matches at the moment.
                </div>
              ) : (
                this.state.liveMatches.map((match, index) => (
                  <Link key={match.key} to={`/match/${match.key}`}>
                    <MatchTile image={match.matchTileImage} />
                  </Link>
                ))
              )}
            </Grid>
            <Grid item xs={12}>
              <div className={classes.headings}> PAST MATCHES </div>
              {this.state.pastMatches.map((match, index) => (
                <Link key={match.key} to={`/match/${match.key}`}>
                  <MatchTile image={match.matchTileImage} />
                </Link>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} />
      </Grid>
    );
  }
}

export default withStyles(styles)(FixturesDisplay);
