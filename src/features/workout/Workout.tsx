import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { incrementTodayByAmount } from "../chart/chartSlice";
import styles from "./Workout.module.css";

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

function Workout() {
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const changeTotal = useCallback(
    (amount: number, event: React.MouseEvent<HTMLElement>) => {
      setTotal(total + amount);
      event.currentTarget.blur();
    },
    [total]
  );
  const complete = useCallback(() => {
    dispatch(incrementTodayByAmount(total));
    setTotal(0);
    navigate("/", { replace: true });
  }, [total, dispatch]);

  return (
    <main className={styles.workout}>
      <div>{total}</div>
      <div className={styles["plus-minus-slider"]}>
        <button
          onClick={(event) => changeTotal(-1, event)}
          className={styles.button1}
        >
          -
        </button>
        <span className={styles.slider}>slider</span>
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
