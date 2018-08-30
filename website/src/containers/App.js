import React from "react";
import { Switch, Route } from "react-router-dom";

//Container ELements
import IterationDisplay from "./IterationDisplay";
import ProductHuntLandingPage from "./ProductHunt";
import Basic from "./Basic";

const App = () => (
  <Switch>
    <Route exact path="/" component={Basic} />
    <Route exact path="/product-hunt" component={ProductHuntLandingPage} />
    <Route exact path="/options" component={IterationDisplay} />
  </Switch>
);

export default App;
