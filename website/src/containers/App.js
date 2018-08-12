import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Container ELements
import IterationDisplay from "./IterationDisplay";
import ProductHuntLandingPage from "./ProductHunt";
import Basic from "./Basic";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={IterationDisplay} />
      <Route exact path="/product-hunt" component={ProductHuntLandingPage} />
      <Route exact path="/basic" component={Basic} />
    </Switch>
  </BrowserRouter>
);

export default App;
