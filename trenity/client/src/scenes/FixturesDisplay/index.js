import React from "react";
import { Switch, Route } from "react-router-dom";

//Containers
import View from "./View";
import MatchView from "../MatchView";

const FixturesDisplay = () => (
  <Switch>
    <Route exact path="/fixtures" component={View} />
    <Route path="/fixtures/match/:matchId" component={MatchView} />
  </Switch>
);

export default FixturesDisplay;
