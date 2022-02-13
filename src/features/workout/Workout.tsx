import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { incrementTodayByAmount } from "../chart/chartSlice";
import ChinButton from "../chinButton/ChinButton";
import MyRange from "../MyRange/MyRange";
import { setDemoCleared } from "../settings/settingsSlice";
import styles from "./Workout.module.css";

const MAX_REPS_PER_WORKOUT = 300;

type TwoRowProps = {
  amount: number;
  changeTotal: (amount: number, event: React.MouseEvent<HTMLElement>) => void;
};

function TwoButtonRow({ amount, changeTotal }: TwoRowProps) {
  return (
    <div className={styles["two-button-row"]}>
      <button
        onClick={(event) => changeTotal(-amount, event)}
        className={styles["button10or50"]}
      >
        -{amount}
      </button>
      <button
        onClick={(event) => changeTotal(amount, event)}
        className={styles["button10or50"]}
      >
        +{amount}
      </button>
    </div>
  );
}

function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

function Workout() {
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setDemoCleared());
  }, []);

  const changeTotal = useCallback(
    (amount: number, event: React.MouseEvent<HTMLElement>) => {
      setTotal(clamp(total + amount, 0, MAX_REPS_PER_WORKOUT));
      event.currentTarget.blur();
    },
    [total, dispatch]
  );

  const complete = useCallback(() => {
    dispatch(incrementTodayByAmount(total));
    setTotal(0);
    navigate("/", { replace: true });
  }, [total, dispatch, useCallback]);

  return (
    <main className={styles.workout}>
      <ChinButton
        total={total}
        max={MAX_REPS_PER_WORKOUT}
        changeTotal={changeTotal}
      />
      <div className={styles["plus-minus-slider"]}>
        <button
          onClick={(event) => changeTotal(-1, event)}
          className={styles.button1}
        >
          -
        </button>
        <MyRange total={total} setTotal={setTotal} max={MAX_REPS_PER_WORKOUT} />
        <button
          onClick={(event) => changeTotal(1, event)}
          className={styles.button1}
        >
          +
        </button>
      </div>
      <div className={styles["below-slider"]}>
        <TwoButtonRow amount={10} changeTotal={changeTotal} />
        <TwoButtonRow amount={50} changeTotal={changeTotal} />
        <button onClick={complete} type="submit">
          Complete
        </button>
      </div>
    </main>
  );
}

export default Workout;
