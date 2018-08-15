import React from "react";
import { Switch, Route } from "react-router-dom";

//Container ELements
import IterationDisplay from "./IterationDisplay";
import ProductHuntLandingPage from "./ProductHunt";
import Basic from "./Basic";

const App = () => (
  <Switch>
    <Route exact path="/" component={IterationDisplay} />
    <Route exact path="/product-hunt" component={ProductHuntLandingPage} />
    <Route exact path="/basic" component={Basic} />
  </Switch>
);

export default App;
