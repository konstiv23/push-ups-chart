import { Link } from "react-router-dom";
import styles from "./StartButton.module.css";

function StartButton() {
  return (
    <button className={styles["start-button"]}>
      <Link to="workout">Start</Link>
    </button>
  );
}

export default StartButton;
