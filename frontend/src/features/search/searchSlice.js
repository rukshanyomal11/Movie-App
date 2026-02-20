import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchMulti } from './searchAPI';

export const searchContent = createAsyncThunk(
  'search/searchContent',
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const response = await searchMulti(query, page);
      return response.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;