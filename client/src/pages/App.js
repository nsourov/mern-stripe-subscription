import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Plans from "./Plans";
import Checkout from "./Checkout";

import "../style.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Plans />
        </Route>
        <Route exact path="/:planId">
          <Checkout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
