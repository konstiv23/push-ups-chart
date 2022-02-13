import { todaysDayNumber } from "../../utils/dateManipulation";
import { RepsDay } from "./chartSlice";
import { random, seed } from "../../utils/myRandom";

export function getDemoInitialReps(numDays: number) {
  const repsDays: RepsDay[] = [];
  const today = todaysDayNumber();
  const start = today - numDays + 1;
  seed(69);
  for (let i = start; i <= today; i++) {
    repsDays.push({
      day: i,
      reps: Math.floor(random() * 3 * (i - start)),
    });
  }
  // so that we have a few of skipped days:
  repsDays.splice(repsDays.length - 10, 1);
  //repsDays.splice(2, 1);
  return repsDays;
}
