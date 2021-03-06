import React, { useContext } from "react";
import "firebase/auth";
import firebase from "firebase/app";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import logo from "../../Icon/Logo.png";
import "./Header.css";
import { userContext } from "./../Home/Home";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const Header = (props) => {
  const { name } = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  console.log(loggedInUser);
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const userInfo = { ...loggedInUser };
        userInfo.name = "";
        userInfo.email = "";
        userInfo.password = "";
        userInfo.repassword = "";
        userInfo.photoURL = "";
        userInfo.displayName = "";
        userInfo.error = "";
        userInfo.success = false;
        userInfo.showError = false;
        userInfo.isLoggedIn = false;
        userInfo.fName = "";
        userInfo.lName = "";
        userInfo.showName = false;
        setLoggedInUser(userInfo);
      })
      .catch((error) => {});
  };
  return (
    <div className="header">
      <Navbar className="text-center" bg="dark" variant="dark">
        <Navbar.Brand className="logo" href="#home">
          <img src={logo} alt="" />
        </Navbar.Brand>
        <div className="menu ">
          <Link to="/login">
            <li>Contact</li>
          </Link>
          <Link to="/login">
            <li>Blog</li>
          </Link>
          <Link to={`/destination/${name}`}>
            <li>Destination</li>
          </Link>
          <Link to="/home">
            <li>Home</li>
          </Link>
          {loggedInUser.isLoggedIn && (
            <div className="col-sm-12 profile-name">
              {loggedInUser.showName ? (
                <li className="profile-name ">{loggedInUser.name}</li>
              ) : (
                <li className="profile-name">
                  {loggedInUser.fName} {loggedInUser.lName}
                </li>
              )}
            </div>
          )}
        </div>
        {loggedInUser.isLoggedIn ? (
          <Link to="/login">
            <Button onClick={signOut} variant="outline-info">
              Sign out
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button variant="outline-info">Create account</Button>
          </Link>
        )}
      </Navbar>
    </div>
  );
};

export default Header;
