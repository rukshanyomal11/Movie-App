import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularActors, fetchActorDetails, fetchActorMovieCredits } from './actorsAPI';

export const getPopularActors = createAsyncThunk(
  'actors/getPopularActors',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchPopularActors(page);
      return response.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getActorDetails = createAsyncThunk(
  'actors/getActorDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchActorDetails(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getActorCredits = createAsyncThunk(
  'actors/getActorCredits',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchActorMovieCredits(id);
      return { id, credits: response };
    } catch (error) {
      return rejectWithValue({ id, message: error.message });
    }
  }
);

const actorsSlice = createSlice({
  name: 'actors',
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
      .addCase(getPopularActors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPopularActors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.popular = action.payload;
      })
      .addCase(getPopularActors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getActorDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getActorDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details[action.payload.id] = action.payload;
      })
      .addCase(getActorDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getActorCredits.pending, (state, action) => {
        state.creditsStatus[action.meta.arg] = 'loading';
        state.creditsError[action.meta.arg] = null;
      })
      .addCase(getActorCredits.fulfilled, (state, action) => {
        state.creditsStatus[action.payload.id] = 'succeeded';
        state.credits[action.payload.id] = action.payload.credits;
      })
      .addCase(getActorCredits.rejected, (state, action) => {
        const id = action.payload?.id ?? action.meta.arg;
        state.creditsStatus[id] = 'failed';
        state.creditsError[id] = action.payload?.message || action.error?.message;
      });
  },
});

export default actorsSlice.reducer;
