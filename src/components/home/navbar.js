import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "../../App.css";

const Navbar = ({ authUser }) => {
  const [, setShowReloadingMessage] = useState(false);
  const navigate = useNavigate();

  const logoutFunc = () => {
    const shouldLogout = window.confirm(
      "Are you sure you want to logout from this device?"
    );

    if (shouldLogout) {
      setShowReloadingMessage(true);

      signOut(auth)
        .then(() => {
          setTimeout(() => {
            alert("User SignOut Successfully");
            navigate("/");
            setShowReloadingMessage(false);
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
          setShowReloadingMessage(false);
        });
    }
  };

  return (
    <nav className="navbar1">
      <div className="navbar-left">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favourites">Favorites</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <ul>
          {authUser ? (
            <li>
              <Link onClick={logoutFunc} to="/" className="logout-btn">
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
