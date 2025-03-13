// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  username: string;
  password: string;
  userToken:string,
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  username: '',
  password: '',
  userToken:'',
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ username: string; password: string ;userToken:string}>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.userToken = action.payload.userToken;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = '';
      state.password = '';
      state.userToken = '';
    },
  },
});

export const { setCredentials, login, logout } = authSlice.actions;
export default authSlice.reducer;