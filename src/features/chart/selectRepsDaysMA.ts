import { RootState } from "../../app/store";
/// <reference path="moving-averages.d.ts">
import { ema, ma } from "moving-averages";
import { todaysDayNumber } from "../../utils/dateManipulation";
import { RepsDay } from "./chartSlice";
import { getDemoInitialReps } from "./demoData";
import { MAType } from "../settings/settingsSlice";

export type RepsDayMA = RepsDay & { movAverage: number };

const demoData = getDemoInitialReps(60);

export const selectRepsDaysMA = ({ chart, settings }: RootState) => {
  let repsDays = chart.repsDays;
  if (!settings.demoDataCleared) {
    repsDays = demoData;
  }
  if (!repsDays.length) {
    repsDays = [{ day: todaysDayNumber(), reps: 0 }];
  }
  // Needed to start MA right, filtered later
  repsDays = prependZeroDays(
    repsDays,
    settings.maxDaysToShow,
    settings.smoothingInterval
  );
  repsDays = fillInZeroDays(repsDays, settings.maxDaysToShow); // zero days in-between and after
  let repsDaysWithMA = addMovAverage(
    repsDays,
    settings.smoothingInterval,
    settings.maType
  );
  repsDaysWithMA = filterLeadingZeroDays(repsDaysWithMA);
  return lastNDays(repsDaysWithMA, settings.maxDaysToShow);
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

function filterLeadingZeroDays(repsDaysMAs: RepsDayMA[]) {
  // When there's still only a few days of data, show only them,
  // but a minimum of 2
  const firstNonZero = repsDaysMAs.findIndex((r) => r.reps > 0);
  if (firstNonZero === -1) {
    // all zero days
    return lastNDays(repsDaysMAs, 2);
  } else if (firstNonZero === repsDaysMAs.length - 1) {
    // only today has reps
    return lastNDays(repsDaysMAs, 2);
  }
  return repsDaysMAs.slice(firstNonZero);
}

function lastNDays<ArrayMembrer>(arr: ArrayMembrer[], n: number) {
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
  return withZeroDays;
}

function addMovAverage(
  repsDays: RepsDay[],
  smoothingInterval: number,
  maType: MAType
) {
  const justReps = repsDays.map((r) => r.reps);
  let myMa: number[] = [];
  if (maType === "MA") {
    myMa = ma(justReps, smoothingInterval);
  } else {
    myMa = ema(justReps, smoothingInterval);
  }
  return repsDays.map((r, index) => ({
    ...r,
    movAverage: Math.round(myMa[index]),
  }));
}
