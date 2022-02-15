import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todaysDayNumber } from "../../utils/dateManipulation";

export type RepsDay = {
  day: number;
  reps: number;
};

export interface ChartState {
  repsDays: RepsDay[];
}

let initialRepsDays = JSON.parse(localStorage.getItem("repsDays") || "[]");

const initialState: ChartState = {
  repsDays: initialRepsDays,
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    incrementTodayByAmount: (state, action: PayloadAction<number>) => {
      const latestRepsDay = state.repsDays[state.repsDays.length - 1];
      const today = todaysDayNumber();
      if (latestRepsDay?.day === today) {
        latestRepsDay.reps += action.payload;
      } else {
        state.repsDays.push({ day: today, reps: action.payload });
      }
    },
    completelyClear: (state) => {
      state.repsDays = [];
    },
  },
});

export default chartSlice.reducer;

export const { incrementTodayByAmount, completelyClear } = chartSlice.actions;
