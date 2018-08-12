import React from "react";
import { Switch, Route } from "react-router-dom";

//Containers
import View from "./View";
import MatchView from "../MatchView";

const Demo = () => (
  <Switch>
    <Route exact path="/demo" component={View} />
    <Route path="/demo/match/:matchId" component={MatchView} />
  </Switch>
);

export default Demo;
