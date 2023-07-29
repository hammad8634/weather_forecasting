import React from "react";
import { useSelector } from "react-redux";

const FavouritesPage = () => {
  const favorites = useSelector((state) => state.favorite.value);

  return (
    <div>
      <h1>Favourite Locations</h1>
      <ul>
        {favorites.map((favourite) => (
          <li key={`${favourite.lat}-${favourite.lon}`}>
            <b>Location Name: </b>
            {favourite.name} <b>Latitude: </b> {favourite.lat},{" "}
            <b>Longitude: </b> {favourite.lon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPage;
