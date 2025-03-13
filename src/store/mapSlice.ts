

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapState {
  points: Coordinates[];
}

const initialState: MapState = {
  points: [],
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    addPoint(state, action: PayloadAction<Coordinates>) {
      if (state.points.length >= 2) {
        state.points = [];
        return
      }
      state.points.push(action.payload);
    },
    resetPoints(state) {
      state.points = [];
    },
  },
});

export const { addPoint, resetPoints } = mapSlice.actions;

export const selectPoints = (state: { map: MapState }) => state.map.points;

export default mapSlice.reducer;
