import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularActors, fetchActorDetails } from './actorsAPI';

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

const actorsSlice = createSlice({
  name: 'actors',
  initialState: {
    popular: [],
    details: {},
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
      });
  },
});

export default actorsSlice.reducer;