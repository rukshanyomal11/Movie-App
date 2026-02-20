import { createSlice } from '@reduxjs/toolkit';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    movies: [], // Array of movie IDs
  },
  reducers: {
    addToWatchlist: (state, action) => {
      if (!state.movies.includes(action.payload)) {
        state.movies.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.movies = state.movies.filter((id) => id !== action.payload);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;