import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import actorsReducer from '../features/actors/actorsSlice';
import directorsReducer from '../features/directors/directorsSlice';
import searchReducer from '../features/search/searchSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    actors: actorsReducer,
    directors: directorsReducer,
    search: searchReducer,
  },
});

export default store;