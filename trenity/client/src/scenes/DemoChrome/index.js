import React from "react";
import { Switch, Route } from "react-router-dom";

//Containers
import List from "./List";
import ViewContainer from "./ViewContainer";

const Demo = () => (
  <Switch>
    <Route exact path="/demo-chrome" component={List} />
    <Route path="/demo-chrome/match/:matchId" component={ViewContainer} />
  </Switch>
);

export default Demo;
