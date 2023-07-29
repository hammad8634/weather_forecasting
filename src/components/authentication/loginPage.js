/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const LoginPage = () => {
  const handleLogin = () => {
    console.log("Logged in");
  };
  return (
    <>
      <div className="login-div">
        <h2>Login Form</h2>
        <div className="input-fields">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            // value="Emailll"
          ></input>
          <br />
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            // value="Passssss"
          ></input>
          <br />
          <span className="psw">
            <button
              // className="login-button"
              className="btn btn-primary"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
            <br />

            <div className="forgot-password">
              Forgot{" "}
              <a className="forgot-link" href="#Forget">
                password?
              </a>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
