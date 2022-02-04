import { useCallback, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { incrementTodayByAmount } from "../chart/chartSlice";

function WorkoutControls() {
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const complete = useCallback(() => {
    dispatch(incrementTodayByAmount(total));
    setTotal(0);
  }, [total]);
  return (
    <>
      <div>{total}</div>
      <button onClick={() => setTotal(total + 1)}>Plus 1</button>
      <button onClick={complete}>Complete</button>
    </>
  );
}

export default WorkoutControls;
