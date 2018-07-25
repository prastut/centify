import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//UI ELements
import Home from "../Home";
import Match from "../Match";

import "../../assets/css/swiper.min.css";
import Dashboard from "../Dashboard";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/match/:matchId" component={Match} />
      {/* <Route path="/video/:matchId" component={MatchViewWithVideo} /> */}
    </Switch>
  </BrowserRouter>
);

export default App;
