import { todaysDayNumber } from "../../utils/dateManipulation";
import { RepsDay } from "./chartSlice";

export function getDemoInitialReps(numDays: number) {
  const repsDays: RepsDay[] = [];
  const today = todaysDayNumber();
  for (let i = today - numDays + 1; i <= today; i++) {
    repsDays.push({ day: i, reps: Math.floor(Math.random() * 100) + 5 });
  }
  //repsDays.splice(2, 1); // so that we have a few of skipped days
  //repsDays.splice(repsDays.length - 2, 1);
  return repsDays;
}
