import { useMemo } from "react";
import pluralize from "pluralize";

type ComparisonProps = {
  reps: number;
  movAv: number;
};

function TodayStatus({ reps, movAv }: ComparisonProps) {
  const message = useMemo(() => {
    const diff = Math.abs(reps - movAv);
    const diffPlusOne = diff + 1;
    if (reps < movAv) {
      return (
        <span>
          <strong>{diffPlusOne}</strong> more {pluralize("time", diffPlusOne)}{" "}
          left to beat moving average
        </span>
      );
    } else if (reps > movAv) {
      return (
        <span>
          Moving average beat by <strong>{diff}</strong>{" "}
          {pluralize("time", diff)}
        </span>
      );
    } else {
      return (
        <span>
          Already <strong>even</strong> with moving average today
        </span>
      );
    }
  }, [reps, movAv]);
  return <div>{message}</div>;
}

export default TodayStatus;
