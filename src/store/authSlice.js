import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example async actions for login and signup
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  // Replace this with your login API call
  const response = await fakeApiCall('/login', credentials);
  return response.data;
});

export const signup = createAsyncThunk('auth/signup', async (credentials, thunkAPI) => {
  // Replace this with your signup API call
  const response = await fakeApiCall('/signup', credentials);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

// Fake API call function for demonstration purposes
async function fakeApiCall(url, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { user: data } });
    }, 1000);
  });
}
