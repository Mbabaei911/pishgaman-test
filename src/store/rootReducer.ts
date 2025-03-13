// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the auth slice
import mapReducer from './mapSlice'; 
const rootReducer = combineReducers({

  auth: authReducer, 
  map: mapReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;