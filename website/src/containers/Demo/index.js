import React from "react";

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Container ELements
import LandingPage from "./LandingPage";
import ResearchPage from "./ResearchPage";
import ContactPage from "./ContactPage";
import Demo from "./Demo";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/research" component={ResearchPage} />
      <Route exact path="/contact" component={ContactPage} />
      <Route exact path="/demo" component={Demo} />
    </Switch>
  </BrowserRouter>
);

export default App;
