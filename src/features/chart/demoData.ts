import { todaysDayNumber } from "../../utils/dateManipulation";
import { RepsDays } from "./chartSlice";

export function getDemoInitialReps(numDays: number) {
  const repsDays: RepsDays = [];
  const today = todaysDayNumber();
  for (let i = today - numDays; i <= today; i++) {
    repsDays.push({ day: i, reps: Math.floor(Math.random() * 100) + 5 });
  }
  repsDays.splice(2, 1); // so that we have a few of skipped days
  repsDays.splice(repsDays.length - 2, 1);
  return repsDays;
}
