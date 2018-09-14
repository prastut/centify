import React, { Component } from "react";

//API
import api from "../../api";

//UI Components
import UpcomingMatchView from "../../components/UpcomingMatchView";
import View from "./View";

class Match extends Component {
  state = {
    matchDetailsLoaded: false,
    matchDetails: ""
  };

  match = null;

  async componentDidMount() {
    try {
      const {
        params: { matchId }
      } = this.props.match;

      const matchDetails = await api.getMatchVerboseDetails(matchId);

      this.setState({
        matchDetailsLoaded: true,
        matchDetails: matchDetails
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { matchDetailsLoaded, matchDetails } = this.state;
    const { matchState } = matchDetails;

    if (matchDetailsLoaded) {
      if (matchState === "upcoming") {
        return <UpcomingMatchView matchDetails={this.state.matchDetails} />;
      }

      if (matchState === "past" || matchState === "live") {
        return <View matchDetails={this.state.matchDetails} />;
      }
    }

    return null;
  }
}

export default Match;
