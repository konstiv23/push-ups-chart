import { useEffect, useState } from "react";
import { Range } from "react-range";

type MyRangeProps = {
  total: number;
  setTotal: (total: number) => void;
  max: number;
};

function MyRange({ total, setTotal, max }: MyRangeProps) {
  const clampedTotal = total;
  const [valueObj, setValuesObj] = useState({ values: [total] });
  useEffect(() => setValuesObj({ values: [total] }), [total]);
  function setAll(values: number[]) {
    setValuesObj({ values });
    setTotal(values[0]);
  }
  return (
    <Range
      step={1}
      min={0}
      max={300}
      values={valueObj.values}
      onChange={(values) => setAll(values)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            height: "6px",
            width: "100%",
            borderRadius: "3px",
            backgroundColor: "#ccc",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            height: "25px",
            width: "24px",
            backgroundColor: "#009f7d",
            borderRadius: "50%",
            border: "none",
          }}
        />
      )}
    />
  );
}

export default MyRange;
