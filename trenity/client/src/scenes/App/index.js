import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Scenes
import FixturesDisplay from "../FixturesDisplay";

import Demo from "../Demo";
import Dashboard from "../Dashboard";
import ErrorPage from "../ErrorPage";

import "../../assets/css/swiper.min.css";

const App = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/fixtures" />} />
    <Route path="/fixtures" component={FixturesDisplay} />
    <Route path="/demo" component={Demo} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route component={ErrorPage} />
  </Switch>
);

export default App;
