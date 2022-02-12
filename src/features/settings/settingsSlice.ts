import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface settingsState {
  maxDaysToShow: number;
  smoothingInterval: number;
}

const initialState: settingsState = {
  maxDaysToShow: 30,
  smoothingInterval: 14,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
});

export default settingsSlice.reducer;
