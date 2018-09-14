import React from "react";
import { Switch, Route } from "react-router-dom";

//Containers
import View from "./View";
import Match from "./Match";

const Demo = () => (
  <Switch>
    <Route exact path="/demo" component={View} />
    <Route path="/demo/match/:matchId" component={Match} />
  </Switch>
);

export default Demo;
