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
  const [confirmPassword, setConfirmPassword] = useState(true);
  console.log(confirmPassword);
  console.log(loggedInUser);
  const [newUser, setNewUser] = useState(false);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
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
    fName: "",
    lName: "",
    showName: false,
  });
  const googleProvider = new firebase.auth.GoogleAuthProvider();

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
          showName: true,
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
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
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
          showName: true,
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
    // if (e.target.name === "repassword") {
    //   isValid = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(e.target.value);
    // }
    if (isValid) {
      const userInfo = { ...user };
      userInfo[e.target.name] = [e.target.value];
      setUser(userInfo);
    }
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (confirmPassword && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email[0], user.password[0])
        .then((res) => {
          const fName = user.fName[0];
          const lName = user.lName[0];

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
            showName: false,
            fName: fName,
            lName: lName,
          };
          setUser(userInfo);
          setLoggedInUser(userInfo);
          history.replace(from);
          console.log(loggedInUser);
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
          name: email,
          email: email,
          photo: photoURL,
          success: true,
          error: "",
          showError: false,
          isLoggedIn: true,
          showName: true,
        };
        setUser(userInfo);
        setLoggedInUser(userInfo);
        history.replace(from);
        console.log(loggedInUser);
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

  const handleName = (e) => {
    if (e.target.name === "fName") {
      const userInfo = { ...user };
      userInfo[e.target.name] = [e.target.value];
      setUser(userInfo);
      setLoggedInUser(userInfo);
      console.log(user);
    }
    if (e.target.name === "lName") {
      const userInfo = { ...user };
      userInfo[e.target.name] = [e.target.value];
      setUser(userInfo);
      setLoggedInUser(userInfo);
      console.log(user);
    }
  };

  const handleConfirmPassword = (e) => {
    if (user.password[0] != e.target.value) {
      const userInfo = { ...user };
      userInfo.error =
        "your confirm password is did  not match with the password";
      userInfo.showError = true;
      setUser(userInfo);
      setConfirmPassword(false);
      console.log(user);
    } else {
      const userInfo = { ...user };
      userInfo.error = "";
      userInfo.showError = false;
      setUser(userInfo);
      setConfirmPassword(true);
      console.log(user);
    }
  };

  return (
    <div className="text-center login-main">
      <div className="create-account-main-div">
        <div className="input-box">
          {newUser ? <h1 className="input-title">Create an account</h1> : <h1 className="input-title">Login your account</h1>}
          {user.showError ? (
            <p  style={{ color: "red" }}>{user.error}</p>
          ) : (
            user.success && (
              <p style={{ color: "green" }}>User Logged in successfully </p>
            )
          )}

          <form onSubmit={handleCreateUser} className="form">
            {newUser && (
              <input
                onBlur={handleName}
                type="text"
                placeholder="first Name"
                name="fName"
                required
              />
            )}
            <br />
            {newUser && (
              <input
                onBlur={handleName}
                type="text"
                placeholder="Last Name"
                name="lName"
                required
              />
            )}
            <br />
            <input
              onBlur={handleBlur}
              type="email"
              name="email"
              id=""
              placeholder="Email"
              required
            />
            <br />
            <input
              onBlur={handleBlur}
              type="password"
              name="password"
              id=""
              placeholder="Password"
              required
            />
            <br />
            {newUser && (
              <input
                // onChange={handleBlur}
                onBlur={handleConfirmPassword}
                type="password"
                name="repassword"
                id=""
                placeholder="Confirm Password"
                required
              />
            )}
            <br />

            {newUser ? (
              <input
                // onSubmit={handleCreateUser}
                className="btn btn-info"
                type="submit"
                value="Sign Up"
              />
            ) : (
              <input
                onClick={handleLoggedInUser}
                className="btn btn-info"
                type="submit"
                value="Sign in"
              />
            )}

            {newUser ? (
              <p className="already-have">
                already have an account?
                <span
                  style={{ color: "red", marginLeft: "5px" }}
                  onClick={() => setNewUser(false)}
                >
                  Login
                </span>
              </p>
            ) : (
              <p className="already-have">
                you don't have account ?
                <span
                  id="login-create"
                  style={{ color: "red", marginLeft: "5px" }}
                  onClick={() => setNewUser(true)}
                >
                  Create
                </span>
              </p>
            )}
          </form>
          <button onClick={handleGoogleSignIn} className="google-btn">
            <img src={googleIcon} alt="" />
            Sign-in with Google
          </button>
          <button onClick={handleFacebookSignIn} className="google-btn">
            <img src={fbIcon} alt="" />
            Sign-in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
