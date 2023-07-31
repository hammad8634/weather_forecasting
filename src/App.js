import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/homePage";
import FavouritesPage from "./components/favourites/favouritesPage";
import Navbar from "./components/home/navbar";
import LoginPage from "./components/authentication/loginPage";
import SignupPage from "./components/authentication/signupPage";
import PrivateRoutes from "./components/authentication/PrivateRoute";
import WeatherDetails from "./components/home/weatherDetails";
import ForgotPassword from "./components/authentication/forgotPassword";
import Footer from "./components/home/footer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAuthStateChanged = useCallback((user) => {
    if (user) {
      setAuthUser(user);
    } else {
      setAuthUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);

    return () => unsubscribe();
  }, [handleAuthStateChanged]);

  if (loading) {
    return null;
  }

  return (
    <div className="app">
      <Router>
        <Navbar authUser={authUser} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage authUser={authUser} />} />
          <Route path="/login" element={<LoginPage authUser={authUser} />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/weather/details/:lat/:lon"
            element={<WeatherDetails authUser={authUser} />}
          />

          {/* Private Route */}
          <Route element={<PrivateRoutes authUser={authUser} />}>
            <Route path="/favourites" element={<FavouritesPage />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
