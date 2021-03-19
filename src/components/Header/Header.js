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
      <h1>name:{loggedInUser.name}</h1>
      <Navbar className="text-center" bg="dark" variant="dark">
        <Navbar.Brand className="logo" href="#home">
          <img src={logo} alt="" />
        </Navbar.Brand>
        <Nav className=" text-right">
          <div className="all-link">
            <Link to="/home"> Home </Link>
            <Link to="/destination"> Destination </Link>
            <Link to="/home"> Blog</Link>
            <Link to="/home"> Contact </Link>
          </div>

          {/* <Nav.Link className="menu-items" href="#features">
            Destination
          </Nav.Link>
          <Nav.Link className="menu-items" href="#pricing">
            Blog
          </Nav.Link>
          <Nav.Link className="menu-items" href="#pricing">
            Contact
          </Nav.Link> */}
        </Nav>
        {loggedInUser.isLoggedIn ? (
          <Link to="/login">
            <Button variant="outline-info">Login</Button>
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
