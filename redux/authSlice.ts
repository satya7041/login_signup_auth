// auth slice which contains the state related to user authentication, and the actions (login, logout).
import { createSlice } from "@reduxjs/toolkit";
interface User {
    token: string;
    user: any; // Define a better type for user
  }
  
  interface AuthState {
    token: string | null;
    user: any | null;
  }
  
// Define the initial state for auth
const initialState:AuthState = {
    user: null,
    token:null,
};

// Create the slice
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        // Login Success: Store user data and token
        loginSuccess: (state, action)=> {
            // state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        // Logout: Clear user data and token
    logout: (state) => {
        // state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      },
    }
});
// Export actions to dispatch from components
export const { loginSuccess, logout } = authSlice.actions;
// Export reducer to add to the store
export default authSlice.reducer;