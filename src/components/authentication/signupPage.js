/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "../../index.css";

const SignupPage = () => {
  const signupHandler = () => {
    console.log("Signup");
  };
  return (
    <div className="signup-container  ">
      <h2>Sign Up Page!</h2>
      <div className="input-fields">
        <input
          className="form-control-signup"
          type="text"
          name="name"
          placeholder="Name"
        //   value="Name"
        ></input>{" "}
        <br />
        <br />
        <input
          className="form-control-signup"
          type="email"
          name="email"
          placeholder="E-mail"
        //   value="Email"
        ></input>{" "}
        <br />
        <br />
        <input
          className="form-control-signup"
          type="text"
          name="username"
          placeholder="Username"
        //   value="user name"
        ></input>
        <br />
        <br />
        <input
          className="form-control-signup"
          type="password"
          name="password"
          placeholder="Password"
        //   value=" password"
        ></input>
        <br />
        <br />
        <input
          className="form-control-signup"
          type="password"
          name="passwordConfirm"
          placeholder="ConfirmPassword"
        //   value="Confirm password"
        ></input>
        <br />
        <br />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={signupHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
