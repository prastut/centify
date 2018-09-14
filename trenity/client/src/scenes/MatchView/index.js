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
        location: { search },
        match: {
          params: { matchId }
        }
      } = this.props;

      const matchDetails = await api.getMatchVerboseDetails(matchId);

      const fullScreen = search.split("=")[1] === "fullScreen";

      this.setState({
        matchDetailsLoaded: true,
        matchDetails: { ...matchDetails, fullScreen }
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
