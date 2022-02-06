import { useMemo } from "react";
import pluralize from "pluralize";

type ComparisonProps = {
  reps: number;
  movAv: number;
};

function TodayStatus({ reps, movAv }: ComparisonProps) {
  const message = useMemo(() => {
    const diff = Math.abs(reps - movAv);
    if (reps < movAv) {
      return (
        <p>
          <strong>{diff + 1}</strong> more push-ups left to beat moving average.
        </p>
      );
    } else if (reps > movAv) {
      return (
        <p>
          Moving average beat by <strong>{diff}</strong>{" "}
          {pluralize("push-up", diff)}.
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
