import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularDirectors, fetchDirectorDetails, fetchDirectorMovieCredits } from './directorsAPI';

export const getPopularDirectors = createAsyncThunk(
  'directors/getPopularDirectors',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchPopularDirectors(page);
      return response.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDirectorDetails = createAsyncThunk(
  'directors/getDirectorDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchDirectorDetails(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDirectorCredits = createAsyncThunk(
  'directors/getDirectorCredits',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchDirectorMovieCredits(id);
      return { id, credits: response };
    } catch (error) {
      return rejectWithValue({ id, message: error.message });
    }
  }
);

const directorsSlice = createSlice({
  name: 'directors',
  initialState: {
    popular: [],
    details: {},
    credits: {},
    creditsStatus: {},
    creditsError: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularDirectors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPopularDirectors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.popular = action.payload;
      })
      .addCase(getPopularDirectors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getDirectorDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDirectorDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details[action.payload.id] = action.payload;
      })
      .addCase(getDirectorDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getDirectorCredits.pending, (state, action) => {
        state.creditsStatus[action.meta.arg] = 'loading';
        state.creditsError[action.meta.arg] = null;
      })
      .addCase(getDirectorCredits.fulfilled, (state, action) => {
        state.creditsStatus[action.payload.id] = 'succeeded';
        state.credits[action.payload.id] = action.payload.credits;
      })
      .addCase(getDirectorCredits.rejected, (state, action) => {
        const id = action.payload?.id ?? action.meta.arg;
        state.creditsStatus[id] = 'failed';
        state.creditsError[id] = action.payload?.message || action.error?.message;
      });
  },
});

export default directorsSlice.reducer;
