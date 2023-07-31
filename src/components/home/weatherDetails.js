/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite } from "../favourites/favoriteSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudShowersHeavy,
  faCloud,
  faSun,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import "./weatherDetails.css";

const WeatherDetails = ({ authUser }) => {
  const { lat, lon } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const favorites = useSelector((state) => state.favorite.value);
  const dispatch = useDispatch();

  // console.log(favorites);

  useEffect(() => {
    fetchWeatherData();
  }, [lat, lon]);

  // Get Weather Forecasting Details
  const fetchWeatherData = async () => {
    try {
      const API_KEY = "c49d1bad14d57d47f38dfadaa12f32d2";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      setWeatherData(response.data);
      console.log("API Response Data:", response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Get default Date value to select weather forecasting
  useEffect(() => {
    const dates = Object.keys(groupForecastsByDate());
    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  }, [weatherData]);

  // Handle Add to Favorite Function
  const handleAddToFavorites = () => {
    if (authUser) {
      const locationData = {
        lat,
        lon,
        name: weatherData.city.name,
      };

      const existingLocation = favorites.find(
        (favorite) =>
          favorite.lat === locationData.lat && favorite.lon === locationData.lon
      );

      if (existingLocation) {
        alert("This location is already added to favorites.");
      } else {
        dispatch(addFavorite(locationData));
        // console.log("Adding to favorites:", locationData);
        alert("Location added to favorites successfully.");
      }
    } else {
      alert("You must be logged in to add to favorites.");
    }
  };

  // Sort Data using Date
  const groupForecastsByDate = () => {
    if (!weatherData) return [];

    const forecastsByDate = {};
    weatherData.list.forEach((forecast) => {
      const date = forecast.dt_txt.split(" ")[0];
      if (!forecastsByDate[date]) {
        forecastsByDate[date] = [];
      }
      forecastsByDate[date].push(forecast);
    });

    return forecastsByDate;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Rain":
        return (
          <FontAwesomeIcon
            icon={faCloudShowersHeavy}
            style={{ color: "blue" }}
          />
        );
      case "Clouds":
        return <FontAwesomeIcon icon={faCloud} style={{ color: "gray" }} />;
      case "Clear":
        return (
          <FontAwesomeIcon
            icon={faSun}
            style={{ color: "rgb(217, 227, 73)" }}
          />
        );
      default:
        return <FontAwesomeIcon icon={faQuestion} style={{ color: "black" }} />;
    }
  };

  return (
    <div className="weather-container">
      <h1 className="mt-3">Weather Forecast Details</h1>
      <p className="location-name">
        <b className="fs-6">Location Name : </b>"
        {weatherData ? weatherData.city.name : "Loading..."}"
      </p>
      {weatherData && (
        <div>
          {/* clickable sections for selected date */}
          <div className="weather-dates mb-4 mt-2">
            {Object.keys(groupForecastsByDate()).map((date) => (
              <div
                key={date}
                className={`weather-date ${
                  selectedDate === date ? "selected" : ""
                }`}
                onClick={() => handleDateClick(date)}
              >
                {date}
              </div>
            ))}
          </div>

          {/* Show details of the selected date in a table */}
          {selectedDate && (
            <div>
              <h3 className="mb-3">Date: {selectedDate}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Temperature (°C)</th>
                    <th>Weather</th>
                    <th>Humidity</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {groupForecastsByDate()[selectedDate].map((forecast) => (
                    <tr key={forecast.dt_txt}>
                      <td>
                        <b>{forecast.dt_txt.split(" ")[1]}</b>
                      </td>
                      <td>{forecast.main.temp}</td>
                      <td>
                        {forecast.weather[0].main} {""}
                        {getWeatherIcon(forecast.weather[0].main)}
                      </td>
                      <td>{forecast.main.humidity}</td>
                      <td>{forecast.weather[0].description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      <button onClick={handleAddToFavorites} className="add-location-btn">
        Add to Favorite
      </button>
    </div>
  );
};

export default WeatherDetails;
