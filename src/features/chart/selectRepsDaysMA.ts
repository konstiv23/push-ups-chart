import { RootState } from "../../app/store";
/// <reference path="moving-averages.d.ts">
import { ema } from "moving-averages";
import { todaysDayNumber } from "../../utils/dateManipulation";
import { RepsDay } from "./chartSlice";

export type RepsDayMA = RepsDay & { movAverage: number };

export const selectRepsDaysMA = (state: RootState) => {
  let repsDays = state.chart.repsDays;
  if (!repsDays.length) {
    repsDays = [{ day: todaysDayNumber(), reps: 0 }];
  }
  repsDays = prependZeroDays(
    repsDays,
    state.settings.maxDaysToShow,
    state.settings.smoothingInterval
  );
  repsDays = fillInZeroDays(repsDays, state.settings.maxDaysToShow);
  const repsDaysWithMA = addMovAverage(repsDays);
  return lastNDays(repsDaysWithMA, state.settings.maxDaysToShow);
};

function prependZeroDays(
  repsDays: RepsDay[],
  maxDaysToShow: number,
  smoothingInterval: number
) {
  const newRepsDays = [...repsDays];
  const firstDayBefore = repsDays[0].day;
  const firstAfter = todaysDayNumber() - maxDaysToShow - smoothingInterval;
  for (let i = firstAfter; i < firstDayBefore; i++) {
    newRepsDays.unshift({ day: i, reps: 0 });
  }
  return newRepsDays;
}

function lastNDays(arr: RepsDayMA[], n: number) {
  return arr.slice(Math.max(arr.length - n, 0));
}

function fillInZeroDays(repsDays: RepsDay[], lengthInDays: number) {
  if (!repsDays.length) {
    return [];
  }
  const withZeroDays: RepsDay[] = [];
  const repsDaysMap: { [id: string]: number } = {};
  repsDays.forEach((r) => (repsDaysMap[r.day] = r.reps));
  const today = todaysDayNumber();
  const firstDay = Math.min(repsDays[0].day, today - lengthInDays);
  for (let i = firstDay; i <= today; i++) {
    const reps = repsDaysMap[i] || 0;
    withZeroDays.push({ day: i, reps });
  }
  console.log(todaysDayNumber(), withZeroDays);
  console.log(new Date());
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
