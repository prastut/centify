import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { isEmpty } from "ramda";

//Material Styles
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

//UI ELements
import Navbar from "../../components/Navbar";
import MatchTile from "../../components/MatchTile";

const HARDCODED_LINK =
  "/match/CROFRA_FINAL?link=bit.ly/2Ad4YoC&matchStart=13&key=Mario_Mandzukic&throttleAt=20";

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
  }
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liveMatches: [],
      pastMatches: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/match/all")
      .then(response => {
        this.setState({
          liveMatches: response.data.filter(m => m.isLive),
          pastMatches: response.data.filter(m => !m.isLive)
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleClick = index => {
    console.log(index);
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Navbar text="Trenity" />
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
                    <MatchTile
                      image={match.matchTileImage}
                      handleClick={this.handleClick}
                    />
                  </Link>
                ))
              )}
            </Grid>
            <Grid item xs={12}>
              <div className={classes.headings}> PAST MATCHES </div>
              {this.state.pastMatches.map((match, index) => (
                <Link key={match.key} to={HARDCODED_LINK}>
                  <MatchTile
                    image={match.matchTileImage}
                    handleClick={this.handleClick}
                  />
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

export default withStyles(styles)(Home);
