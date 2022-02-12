import { RootState } from "../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDemoInitialReps } from "./demoData";
import { todaysDayNumber } from "../../utils/dateManipulation";

export type RepsDay = {
  day: number;
  reps: number;
};

export interface ChartState {
  repsDays: RepsDay[];
  lengthInDays: number;
}

let initialRepsDays = JSON.parse(localStorage.getItem("repsDays") || "[]");
if (!initialRepsDays.length) {
  initialRepsDays = getDemoInitialReps(60);
}

const initialState: ChartState = {
  repsDays: initialRepsDays,
  lengthInDays: 30,
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    incrementTodayByAmount: (state, action: PayloadAction<number>) => {
      const latestRepsDay = state.repsDays[state.repsDays.length - 1];
      const today = todaysDayNumber();
      if (latestRepsDay.day === today) {
        latestRepsDay.reps += action.payload;
      } else {
        state.repsDays.push({ day: today, reps: action.payload });
      }
    },
  },
});

export const selectRepsDays = (state: RootState) => {
  return state.chart.repsDays;
};

export const selectLengthInDays = (state: RootState) =>
  state.chart.lengthInDays;

export default chartSlice.reducer;

export const { incrementTodayByAmount } = chartSlice.actions;
