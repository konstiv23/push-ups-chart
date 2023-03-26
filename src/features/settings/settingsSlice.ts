import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type MAType = "MA" | "EMA";

export interface settingsState {
  maxDaysToShow: number;
  smoothingInterval: number;
  demoDataCleared: boolean;
  maType: MAType;
}

const initialState: settingsState = {
  maxDaysToShow: 30,
  smoothingInterval: 14,
  demoDataCleared: false,
  maType: "EMA",
};

const loadedState = JSON.parse(localStorage.getItem("settings") || "{}");

export const settingsSlice = createSlice({
  name: "settings",
  initialState: Object.keys(loadedState).length ? loadedState : initialState,
  reducers: {
    setDemoCleared: (state) => {
      state.demoDataCleared = true;
    },
    setSmoothingInterval: (state, action: PayloadAction<number>) => {
      state.smoothingInterval = action.payload;
    },
    setMaType: (state, action: PayloadAction<MAType>) => {
      state.maType = action.payload;
    },
    setMaxDaysToShow: (state, action: PayloadAction<number>) => {
      state.maxDaysToShow = action.payload;
    },
  },
});

export const selectDemoCleared = (state: RootState) =>
  state.settings.demoDataCleared;

export const selectSmoothing = (state: RootState) =>
  state.settings.smoothingInterval;

export const selectMaType = (state: RootState) => state.settings.maType;

export const selectMaxDaysToShow = (state: RootState) =>
  state.settings.maxDaysToShow;

export const {
  setDemoCleared,
  setSmoothingInterval,
  setMaType,
  setMaxDaysToShow,
} = settingsSlice.actions;

export default settingsSlice.reducer;
