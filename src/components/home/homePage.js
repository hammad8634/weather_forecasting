import React, { useState, useEffect } from "react";
import "./homePage.css";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Fetch the user's current location when the component mounts
    fetchCurrentLocation();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    fetchNominatimSuggestions(event.target.value);
    setSelectedLocation(null);
  };

  const fetchNominatimSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from Nominatim API");
      }

      const data = await response.json();
      setLocationSuggestions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lon: longitude });

          // Fetch the actual name of the current location using reverse geocoding
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );

            if (!response.ok) {
              throw new Error("Failed to fetch data from Nominatim API");
            }

            const data = await response.json();
            setCurrentLocation((prevLocation) => ({
              ...prevLocation,
              display_name: data.display_name,
            }));
          } catch (error) {
            console.error("Error fetching current location data:", error);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleShowWeather = () => {
    if (selectedLocation || currentLocation) {
      const lat = selectedLocation
        ? selectedLocation.lat
        : currentLocation?.lat || "";
      const lon = selectedLocation
        ? selectedLocation.lon
        : currentLocation?.lon || "";

      const path = `/weather/details/${lat}/${lon}`;
      window.location.href = path;
    } else {
      alert("Please select a location first.");
    }
  };

  return (
    <div className="homepage-container">
      <div className="input-data">
        <label htmlFor="locationInput" className="location-label">
          Enter Location Name:
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search item..."
        />
      </div>

      <h5 className="mt-4 mb-3">Location Suggestions:</h5>
      <div className="location-suggestions">
        <ul>
          {locationSuggestions.map((location) => (
            <li
              key={location.place_id}
              onClick={() => handleLocationClick(location)}
              className="location-suggestion"
            >
              {location.display_name}
            </li>
          ))}
        </ul>
      </div>

      <div className="selected-location-details mt-5">
        <h4 className="mb-4 text-center">Selected Location Details:</h4>
        {selectedLocation || currentLocation ? (
          <>
            <p>
              <b>Location Name:</b>{" "}
              {selectedLocation
                ? selectedLocation.display_name
                : currentLocation?.display_name || "Your Current Location"}
            </p>
            <p>
              <b>Latitude:</b>{" "}
              {selectedLocation
                ? selectedLocation.lat
                : currentLocation?.lat || ""}
            </p>
            <p>
              <b>Longitude:</b>{" "}
              {selectedLocation
                ? selectedLocation.lon
                : currentLocation?.lon || ""}
            </p>

            <button onClick={handleShowWeather}>Show Weather Detail</button>
          </>
        ) : (
          <p>No location selected.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
