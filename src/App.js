import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/homePage";
import FavouritesPage from "./components/favourites/favouritesPage";
import Navbar from "./components/home/navbar";
import LoginPage from "./components/authentication/loginPage";
import SignupPage from "./components/authentication/signupPage";
import PrivateRoutes from "./components/authentication/PrivateRoute";
import WeatherDetails from "./components/home/weatherDetails";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/weather/details/:lat/:lon"
            element={<WeatherDetails />}
          />
          <Route path="/favourites" element={<FavouritesPage />} />

          {/* Private Route */}
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
