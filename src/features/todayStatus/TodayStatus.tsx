import { useMemo } from "react";
import pluralize from "pluralize";

type ComparisonProps = {
  reps: number;
  movAv: number;
};

function TodayStatus({ reps, movAv }: ComparisonProps) {
  const message = useMemo(() => {
    const diff = movAv - reps;
    if (reps < movAv) {
      return `${diff} more ${pluralize(
        "time",
        diff
      )} left to beat moving average`;
    } else if (reps > movAv) {
      return `Moving average beat by ${reps - movAv} ${pluralize(
        "time",
        -diff
      )}`;
    } else {
      return "Already even with moving average today";
    }
  }, [reps, movAv]);
  return <div>{message}</div>;
}

export default TodayStatus;
