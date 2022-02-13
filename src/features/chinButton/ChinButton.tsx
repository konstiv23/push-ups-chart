import { useCallback } from "react";
import styles from "./ChinButton.module.css";

// "Bike, Bell Ding, Single, 01-01.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org (modified)
var ding = new Audio(
  `${process.env.PUBLIC_URL}/484344__inspectorj__bike-bell-ding-single-01-01.mp3`
);

type CButtonProps = {
  total: number;
  max: number;
  changeTotal: (total: number, event: React.MouseEvent<HTMLElement>) => void;
};

function ChinButton({ total, max, changeTotal }: CButtonProps) {
  const handleClick = useCallback(
    (event) => {
      changeTotal(1, event);
      if (total < max) {
        ding.pause();
        ding.currentTime = 0;
        ding.play();
      }
    },
    [total, changeTotal, max]
  );

  return (
    <button onClick={handleClick} className={styles["chin-button"]}>
      <div className={styles.background} />
      <div className={styles["circle"]}>{total}</div>
    </button>
  );
}

export default ChinButton;
