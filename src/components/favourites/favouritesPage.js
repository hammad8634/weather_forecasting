import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { deleteFavorite } from "./favoriteSlice";
import { useNavigate } from "react-router-dom";

import "../../App.css";

const FavouritesPage = () => {
  const favorites = useSelector((state) => state.favorite.value);
  const dispatch = useDispatch();
  const [serialNumbers, setSerialNumbers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updatedSerialNumbers = favorites.map((_, index) => index + 1);
    setSerialNumbers(updatedSerialNumbers);
  }, [favorites]);

  const handleDelete = (favourite) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this location from the favorites?"
    );

    if (shouldDelete) {
      dispatch(deleteFavorite(favourite));
    }
  };

  const handleCreateFvrt = () => {
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div>
        <div className="heading-row">
          <h2 className="mb-4">Favourite Locations</h2>
          <button
            className="add-location-btn mb-4"
            onClick={() => handleCreateFvrt()}
          >
            <FontAwesomeIcon icon={faPlus} />
            <text> Add new Location</text>{" "}
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Location Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Weather Forecast</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((favourite, index) => (
              <tr key={`${favourite.lat}-${favourite.lon}`}>
                <td>
                  <b>{serialNumbers[index]}.</b>
                </td>
                <td>{favourite.name}</td>
                <td>{favourite.lat}</td>
                <td>{favourite.lon}</td>
                <td>
                  <a
                    href={`/weather/details/${favourite.lat}/${favourite.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="table-details-link"
                  >
                    Get Weather Details
                  </a>
                </td>
                <td>
                  <span
                    className="delete-icon"
                    onClick={() => handleDelete(favourite)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavouritesPage;
