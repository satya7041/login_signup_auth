// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Add authReducer to manage the authentication state
  },
});

export default store;
