import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import launchesReducer from './launchesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    launches: launchesReducer,
  },
});

export default store;
