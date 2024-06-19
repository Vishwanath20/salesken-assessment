import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLaunches = createAsyncThunk(
  'launches/fetchLaunches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.spacexdata.com/v4/launches');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const launchesSlice = createSlice({
  name: 'launches',
  initialState: {
    launches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.loading = false;
        state.launches = action.payload;
      })
      .addCase(fetchLaunches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default launchesSlice.reducer;
