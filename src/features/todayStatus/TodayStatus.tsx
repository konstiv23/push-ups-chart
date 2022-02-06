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
        <p>
          <strong>{diffPlusOne}</strong> more {pluralize("time", diffPlusOne)}{" "}
          left to beat moving average.
        </p>
      );
    } else if (reps > movAv) {
      return (
        <p>
          Moving average beat by <strong>{diff}</strong>{" "}
          {pluralize("time", diff)}.
        </p>
      );
    } else {
      return (
        <p>
          Already <strong>even</strong> with moving average today.
        </p>
      );
    }
  }, [reps, movAv]);
  return <div style={{ lineHeight: "40px" }}>{message}</div>;
}

export default TodayStatus;
