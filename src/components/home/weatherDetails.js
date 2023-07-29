import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite } from "../favourites/favoriteSlice";

const WeatherDetails = () => {
  const { lat, lon } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const favorites = useSelector((state) => state.favorite.value);
  const dispatch = useDispatch();

  console.log(favorites);

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const fetchWeatherData = async () => {
    try {
      const API_KEY = "b5438a88881938c1f28275b15a2c87bb";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleAddToFavorites = () => {
    const locationData = {
      lat,
      lon,
      name: weatherData ? weatherData.name : "Unknown Location",
    };

    dispatch(addFavorite(locationData));
    console.log("Adding to favorites:", locationData);
    alert("Location Added to Favorites, successfully.")
  };

  return (
    <div>
      <h1>Weather Details</h1>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lon}</p>
      {weatherData && (
        <div>
          <h2>Weather Information</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}</p>
          <p>Weather: {weatherData.weather[0].main}</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
      {/* <Link to="/favourites"> */}
      <button onClick={handleAddToFavorites}>Add to Favorite</button>
      {/* </Link>{" "} */}
    </div>
  );
};

export default WeatherDetails;
