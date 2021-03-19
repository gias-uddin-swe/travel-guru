import React, { useContext } from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import logo from "../../Icon/Logo.png";
import "./Header.css";
import { userContext } from "./../Home/Home";
import { Link } from "react-router-dom";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

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
          <Link to="/home">
            <li>Destination</li>
          </Link>
          <Link to="/home">
            <li>Home</li>
          </Link>
          <div className="col-sm-12 profile-name">
            {loggedInUser.showName ? (
              <li className="profile-name ">{loggedInUser.name}</li>
            ) : (
              <h4 className="profile-name">
                {(loggedInUser.fName[0], loggedInUser.lName[0])}
              </h4>
            )}
          </div>
        </div>
        {loggedInUser.isLoggedIn ? (
          <Link to="/login">
            <Button variant="outline-info">Sign out</Button>
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
