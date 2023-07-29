import { createSlice } from '@reduxjs/toolkit'

const existingFavorites = localStorage.getItem('favorites');

const initialState = {
  value: JSON.parse(existingFavorites??'[]')
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
        const existingFavorites = localStorage.getItem('favorites');
        localStorage.setItem('favorites', JSON.stringify([...JSON.parse(existingFavorites??'[]'),action.payload]))
        state.value.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer