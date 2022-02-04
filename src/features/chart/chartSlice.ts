import { RootState } from "../../app/store";
import { createSlice } from "@reduxjs/toolkit";
import { getDemoInitialReps } from "./demoData";
import { todaysDayNumber } from "../../utils/dateManipulation";

export class RepsDay {
  public day: number;
  public reps: number;

  constructor(day: number, reps: number) {
    this.day = Math.floor(day);
    this.reps = reps;
  }
}

export type RepsDays = RepsDay[];

export interface ChartState {
  repsDays: RepsDays;
  lengthInDays: number;
}

const initialState: ChartState = {
  repsDays: getDemoInitialReps(60),
  lengthInDays: 30
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  }
});

//export const { increment, decrement, incrementByAmount } = chartSlice.actions;

export const selectRepsDays = (state: RootState) => {
  const repsDays = state.chart.repsDays;
  const repsDaysMap: { [id: string]: number } = {};
  repsDays.forEach((r) => (repsDaysMap[r.day] = r.reps));
  const result: RepsDay[] = [];
  const today = todaysDayNumber();
  const firstDay = Math.min(repsDays[0].day, today - state.chart.lengthInDays);
  for (let i = firstDay; i <= today; i++) {
    const reps = repsDaysMap[i] || 0;
    result.push({ day: i, reps });
  }
  const lastNDays = (arr: typeof result, n: number) =>
    arr.slice(Math.max(arr.length - n, 0));
  return lastNDays(result, state.chart.lengthInDays);
};

export const selectLengthInDays = (state: RootState) =>
  state.chart.lengthInDays;

export default chartSlice.reducer;
