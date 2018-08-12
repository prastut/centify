import React from "react";
import { Switch, Route } from "react-router-dom";

//Scenes
import FixturesDisplay from "../FixturesDisplay";

import Demo from "../Demo";
import Dashboard from "../Dashboard";
import ErrorPage from "../ErrorPage";

import "../../assets/css/swiper.min.css";

const App = () => (
  <Switch>
    <Route exact path="/" component={FixturesDisplay} />
    <Route exact path="/demo" component={Demo} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route component={ErrorPage} />
  </Switch>
);

export default App;
