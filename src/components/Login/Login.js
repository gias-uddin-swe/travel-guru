import React, { useContext, useState } from "react";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import googleIcon from "../../Icon/google.png";
import fbIcon from "../../Icon/fb.png";
import firebaseConfig from "./firebase.config";
import { userContext } from "./../Home/Home";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [newUser, setNewUser] = useState(false);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  console.log(newUser);
  const [user, setUser] = useState({
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
  });
  console.log(user);
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = (e) => {
    //e.preventDefault();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        var credential = res.credential;
        var token = credential.accessToken;
        const { displayName, photoURL, email } = res.user;
        const userInfo = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true,
          error: "",
          showError: false,
          isLoggedIn: true,
        };
        setUser(userInfo);
        setLoggedInUser(userInfo);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const userError = { ...user };
        userError.error = errorMessage;
        userError.success = false;
        userError.showError = true;
        userError.isLoggedIn = false;
        setUser(userError);
        setLoggedInUser(userError);
      });
  };
  const handleBlur = (e) => {
    let isValid = true;
    if (e.target.name === "email") {
      isValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      isValid = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(e.target.value);
    }
    if (e.target.name === "repassword") {
      isValid = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(e.target.value);
    }
    if (isValid) {
      const userInfo = { ...user };
      userInfo[e.target.name] = [e.target.value];
      setUser(userInfo);
    }
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email[0], user.password[0])
        .then((res) => {
          var users = res.user;
          const { displayName, photoURL, email } = res.user;
          const userInfo = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL,
            success: true,
            error: "",
            showError: false,
            isLoggedIn: true,
          };
          setUser(userInfo);
          setLoggedInUser(userInfo);
          history.replace(from);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const userError = { ...user };
          userError.error = errorMessage;
          userError.success = false;
          userError.showError = true;
          userError.isLoggedIn = false;
          setUser(userError);
          setLoggedInUser(userError);
        });
    }
  };

  const handleLoggedInUser = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email[0], user.password[0])
      .then((res) => {
        var users = res.user;
        const { displayName, photoURL, email } = res.user;
        const userInfo = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true,
          error: "",
          showError: false,
          isLoggedIn: true,
        };
        setUser(userInfo);
        setLoggedInUser(userInfo);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const userError = { ...user };
        userError.error = errorMessage;
        userError.success = false;
        userError.showError = true;
        userError.isLoggedIn = false;
        setUser(userError);
        setLoggedInUser(userError);
      });
  };
  return (
    <div className="text-center login-main">
      <div className="create-account-main-div">
        <div className="input-box">
          {newUser ? <h1>Create an account</h1> : <h1>Login your account</h1>}
          {user.showError ? (
            <p style={{ color: "red" }}>{user.error}</p>
          ) : (
            user.success && (
              <p style={{ color: "green" }}>User Logged in successfully </p>
            )
          )}
          <form action="" className="form">
            {newUser && <input type="text" placeholder="first Name" />}
            <br />
            {newUser && <input type="text" placeholder="Last Name" />}
            <br />
            <input
              onBlur={handleBlur}
              type="email"
              name="email"
              id=""
              placeholder="Email"
            />
            <br />
            <input
              onBlur={handleBlur}
              type="password"
              name="password"
              id=""
              placeholder="Password"
            />
            <br />
            {newUser && (
              <input
                onBlur={handleBlur}
                type="password"
                name="repassword"
                id=""
                placeholder="Confirm Password"
              />
            )}
            <br />
            {newUser ? (
              <button onClick={handleCreateUser} className="btn btn-info">
                Sign Up
              </button>
            ) : (
              <button onClick={handleLoggedInUser} className="btn btn-info">
                Login
              </button>
            )}
            {newUser ? (
              <p>
                already have an account?
                <span
                  style={{ color: "red" }}
                  onClick={() => setNewUser(false)}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                you don't have account ?
                <span style={{ color: "red" }} onClick={() => setNewUser(true)}>
                  Create
                </span>
              </p>
            )}
          </form>
          <button onClick={handleGoogleSignIn} className="google-btn">
            <img src={googleIcon} alt="" />
            Sign-in with Google
          </button>
          <button className="google-btn">
            <img src={fbIcon} alt="" />
            Sign-in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
