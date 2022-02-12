import { RootState } from "../../app/store";
import { RepsDay } from "./chartSlice";
/// <reference path="moving-averages.d.ts">
import { ema } from "moving-averages";
import { todaysDayNumber } from "../../utils/dateManipulation";

export type RepsDayMA = RepsDay & { movAverage: number };

export const selectRepsDaysMA = (state: RootState) => {
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

function addMovAverage(repsDays: RepsDay[]) {
  const justReps = repsDays.map((r) => r.reps);
  const myMa = ema(justReps, 14);
  return repsDays.map((r, index) => ({
    ...r,
    movAverage: Math.round(myMa[index]),
  }));
}
