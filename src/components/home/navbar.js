// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logoutFunc = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <>
      <div>
        {auth ? (
          <ul className="navbar1-ul">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/favourites">Favourites</Link>
            </li>
            <li>
              <Link onClick={logoutFunc} to="/signup" className="logout-btn">
                logout
              </Link>
            </li>
          </ul>
        ) : (
          <>
            <ul className="navbar1-ul left-navbar">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/favourites">Favourites</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
