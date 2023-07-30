import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

const ForgotPassword = () => {
  const [, setForgotPasswordSent] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setForgotPasswordSent(true);
        alert(
          `Password reset email sent to ${email}. Please check your inbox.`
        );
        navigate("/");
      })
      .catch((error) => {
        console.log("Error in Forgot Password is: ", error);
        alert("Error sending the password reset email. Please try again.");
      });
  };

  return (
    <div className="pt-4">
      <h3>Forgot Password Page</h3>
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
      <div className="mt-3">
        <button
          className="btn btn-primary "
          type="button"
          onClick={handleForgotPassword}
        >
          Forgot Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
