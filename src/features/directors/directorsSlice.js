import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularDirectors, fetchDirectorDetails } from './directorsAPI';

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

const directorsSlice = createSlice({
  name: 'directors',
  initialState: {
    popular: [],
    details: {},
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
      });
  },
});

export default directorsSlice.reducer;