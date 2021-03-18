import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";
const Home = () => {
  return (
    <div>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/">
            <HomePage></HomePage>
          </Route>
          <Route path="/home">
            <HomePage></HomePage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Home;
