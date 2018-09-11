import React, { Component } from "react";

//API
import api from "../../api";

//UI Components
import UpcomingMatchView from "../../components/UpcomingMatchView";
import View from "./View";

class DemoChromeMatch extends Component {
  state = {
    matchDetailsLoaded: false,
    matchDetails: ""
  };

  match = null;

  async componentDidMount() {
    try {
      const {
        url,
        params: { matchId }
      } = this.props.match;

      const matchDetails = await api.getMatchVerboseDetails(matchId);

      const isDemo = url.split("/")[1] === "demo";

      let finalMatchPacket = null;

      if (isDemo) {
        const { search } = this.props.location;
        const variant = search.split("=")[1];

        const demoDetails = api.getDemoDetails(matchId, variant);

        finalMatchPacket = {
          ...matchDetails,
          ...demoDetails,
          isDemo: true
        };
      } else {
        finalMatchPacket = {
          ...matchDetails,
          isDemo: false
        };
      }

      this.setState({
        matchDetailsLoaded: true,
        matchDetails: finalMatchPacket
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

    return <h1>Hello World</h1>;
  }
}

export default DemoChromeMatch;
