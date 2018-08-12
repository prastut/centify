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
  },
  matchLinkContainer: {
    margin: "20px 0"
  },
  matchLink: {
    color: "white"
  }
};

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upcomingMatches: [],
      liveMatches: [],
      pastMatches: []
    };
  }

  async componentDidMount() {
    const fixtures = await api.getAllFixtures();

    console.log(fixtures);

    this.setState({
      upcomingMatches: fixtures.filter(m => m.matchState === "upcoming"),
      liveMatches: fixtures.filter(m => m.matchState === "live"),
      pastMatches: fixtures.filter(m => m.matchState === "past")
    });
  }

  generateLink = match => {
    const { classes } = this.props;

    return (
      <div key={match._id} className={classes.matchLinkContainer}>
        <Link className={classes.matchLink} to={`/fixtures/match/${match._id}`}>
          {match.teamOne} vs {match.teamTwo}
        </Link>
      </div>
    );
  };

  render() {
    const { classes } = this.props;
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
                this.state.liveMatches.map((match, index) =>
                  this.generateLink(match)
                )
              )}
            </Grid>
            {/* <Grid item xs={12}>
              <div className={classes.headings}> PAST MATCHES </div>
              {this.state.pastMatches.map((match, index) => (
                <Link key={match.key} to={`/fixtures/match/${match.key}`}>
                  <MatchTile image={match.matchTileImage} />
                </Link>
              ))}
            </Grid> */}
            <Grid item xs={12}>
              <div className={classes.headings}> UPCOMING MATCHES </div>
              {this.state.upcomingMatches.map((match, index) =>
                this.generateLink(match)
              )}
            </Grid>

            <Grid item xs={12}>
              <div className={classes.headings}> PAST MATCHES </div>
              {this.state.pastMatches.map((match, index) =>
                this.generateLink(match)
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} />
      </Grid>
    );
  }
}

export default withStyles(styles)(View);
