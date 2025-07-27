import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularMovies, fetchMoviesByGenre, fetchMovieDetails } from './moviesAPI';

export const getPopularMovies = createAsyncThunk(
  'movies/getPopularMovies',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchPopularMovies(page);
      return response.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMoviesByGenre = createAsyncThunk(
  'movies/getMoviesByGenre',
  async ({ genreId, page }, { rejectWithValue }) => {
    try {
      const response = await fetchMoviesByGenre(genreId, page);
      return response.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMovieDetails = createAsyncThunk(
  'movies/getMovieDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchMovieDetails(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    popular: [],
    byGenre: [],
    details: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.popular = action.payload;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getMoviesByGenre.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMoviesByGenre.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.byGenre = action.payload;
      })
      .addCase(getMoviesByGenre.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details[action.payload.id] = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;