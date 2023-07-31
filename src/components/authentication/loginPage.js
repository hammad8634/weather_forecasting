import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";

const LoginPage = ({ authUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (authUser) {
    alert("Already logged In.");
    return <Navigate to="/" />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        alert(`Welcome! Logged in successfully.`);
        navigate("/");
        console.log("Logged in");
      })
      .catch((error) => {
        console.log("Error in Login Page is : ", error);
        alert("Wrong / Invalid Email or Password! Please try again.");
      });
  };

  const handleGmailLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        alert(`Logged in successfully using Gmail.`);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error in Gmail Login is : ", error);
        alert("Error while logging in using Gmail. Please try again.");
      });
  };

  return (
    <>
      <div className="login-container p-2">
        <div className="login-div p-3">
          <h2>Login Form</h2>
          <div className="pt-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleGmailLogin}
            >
              <FontAwesomeIcon icon={faEnvelope} /> Continue with G-mail
            </button>
          </div>
          <div className="pt-3">Or</div>
          <div className="form-group email-div row mt-3">
            <label htmlFor="email" className="col-md-1 col-form-label">
              <b>Email:</b>
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group password-div row mt-3">
            <label htmlFor="password" className="col-md-1 col-form-label">
              <b>Password:</b>
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row mt-3">
            <div className=" offset-md-2">
              <a className="forgot-link" href="/forgotpassword">
                Forgot password?
              </a>
            </div>
          </div>
          <div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
