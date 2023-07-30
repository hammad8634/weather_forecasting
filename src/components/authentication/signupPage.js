import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
import "../../App.css";
import "../../index.css";
import { useNavigate, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const SignupPage = ({ authUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();

  if (authUser) {
    alert("Already logged In.");
    return <Navigate to="/" />;
  }

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Password and confirm password should same. Please try again.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password, confirmpassword)
      .then((userCredential) => {
        console.log(userCredential);
        alert(`Account created successfully for ${email}`);
      })
      .catch((error) => {
        console.log("Error in Sign Up Page is : ", error);
        alert(`Error while creating account. Please try again!`);
      });
    console.log("Sign Up");
  };

  const handleGmailSignup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        alert(
          `Account created successfully using Gmail for ${result.user.email}`
        );
        navigate("/");
      })
      .catch((error) => {
        console.log("Error in Gmail Signup is : ", error);
        alert(`Error while creating account using Gmail. Please try again!`);
      });
  };

  return (
    <>
      <div className="signup-container p-3">
        <div className="signup-div p-3">
          <h2>Sign Up Form</h2>
          <div className="pt-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleGmailSignup}
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
          <div className="form-group password-div row mt-3">
            <label
              htmlFor="confirm password"
              className="col-md-1 col-form-label"
            >
              <b>Confirm Password:</b>
            </label>
            <div className="col-md-3">
              <input
                className="form-control"
                type="password"
                name="confirmpassword"
                placeholder="Confirm password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row mt-1 mb-4">
            <div className=" offset-md-2">
              Already have an account?{" "}
              <a className="forgot-link" href="/login">
                Log In here!
              </a>
            </div>
          </div>
          <div className="">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSignup}
            >
              Create Account
            </button>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
