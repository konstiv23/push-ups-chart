import { RootState } from "../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDemoInitialReps } from "./demoData";
import { todaysDayNumber } from "../../utils/dateManipulation";
/// <reference path="moving-averages.d.ts">
import { ema } from "moving-averages";

export type RepsDay = {
  day: number;
  reps: number;
};

export interface ChartState {
  repsDays: RepsDay[];
  lengthInDays: number;
}

const initialState: ChartState = {
  repsDays: getDemoInitialReps(60),
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
  let repsDays = state.chart.repsDays;
  repsDays = fillInZeroDays(repsDays, state.chart.lengthInDays);
  const repsDaysWithMA = addMovAverage(repsDays);
  return lastNDays(repsDaysWithMA, state.chart.lengthInDays);
};

function lastNDays(arr: RepsDayMA[], n: number) {
  return arr.slice(Math.max(arr.length - n, 0));
}

function fillInZeroDays(repsDays: RepsDay[], lengthInDays: number) {
  const withZeroDays: RepsDay[] = [];
  const repsDaysMap: { [id: string]: number } = {};
  repsDays.forEach((r) => (repsDaysMap[r.day] = r.reps));
  const today = todaysDayNumber();
  const firstDay = Math.min(repsDays[0].day, today - lengthInDays);
  for (let i = firstDay; i <= today; i++) {
    const reps = repsDaysMap[i] || 0;
    withZeroDays.push({ day: i, reps });
  }
  return withZeroDays;
}

export type RepsDayMA = RepsDay & { movAverage: number };

function addMovAverage(repsDays: RepsDay[]) {
  const justReps = repsDays.map((r) => r.reps);
  const myMa = ema(justReps, 14);
  return repsDays.map((r, index) => ({
    ...r,
    movAverage: Math.round(myMa[index]),
  }));
}

export const selectLengthInDays = (state: RootState) =>
  state.chart.lengthInDays;

export default chartSlice.reducer;

export const { incrementTodayByAmount } = chartSlice.actions;
