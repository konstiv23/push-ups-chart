import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface settingsState {
  maxDaysToShow: number;
  smoothingInterval: number;
  demoDataCleared: boolean;
}

const initialState: settingsState = {
  maxDaysToShow: 30,
  smoothingInterval: 14,
  demoDataCleared: false,
};

const loadedState = JSON.parse(localStorage.getItem("settings") || "{}");

export const settingsSlice = createSlice({
  name: "settings",
  initialState: Object.keys(loadedState).length ? loadedState : initialState,
  reducers: {
    setDemoCleared: (state) => {
      state.demoDataCleared = true;
    },
  },
});

export const selectDemoCleared = (state: RootState) =>
  state.settings.demoDataCleared;

export const { setDemoCleared } = settingsSlice.actions;

export default settingsSlice.reducer;
