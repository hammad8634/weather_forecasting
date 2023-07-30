import { createSlice } from "@reduxjs/toolkit";

const existingFavorites = localStorage.getItem("favorites");

const initialState = {
  value: JSON.parse(existingFavorites ?? "[]"),
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    //Add favourite entry from local storage
    addFavorite: (state, action) => {
      const existingFavorites = localStorage.getItem("favorites");
      localStorage.setItem(
        "favorites",
        JSON.stringify([
          ...JSON.parse(existingFavorites ?? "[]"),
          action.payload,
        ])
      );
      state.value.push(action.payload);
    },

    //Delete favourite entry from local storage
    deleteFavorite: (state, action) => {
      const { lat, lon } = action.payload;
      const updatedFavorites = state.value.filter(
        (fav) => fav.lat !== lat && fav.lon !== lon
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      state.value = updatedFavorites;
    },
  },
});

export const { addFavorite, deleteFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
