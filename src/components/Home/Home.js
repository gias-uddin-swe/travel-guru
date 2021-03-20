import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Destination from "../Destinattion/Destination";
import Error404 from "../Error404/Error404";
import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";
import Login from "../Login/Login";
import PrivateRoute from "./../PrivateRoute/PrivateRoute";

export const userContext = createContext();

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    photoURL: "",
    displayName: "",
    error: "",
    success: false,
    showError: false,
    isLoggedIn: false,
    fName: "",
    lName: "",
  });
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      

      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
          <Route path="/home">
            <HomePage></HomePage>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/destination/:name">
            <Destination></Destination>
          </PrivateRoute>
          <Route path="*">
            <Error404></Error404>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
};

export default Home;
