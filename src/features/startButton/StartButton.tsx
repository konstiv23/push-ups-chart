import { Link } from "react-router-dom";
import styles from "./StartButton.module.css";

function StartButton() {
  return (
    <Link to="workout">
      <button className={styles["start-button"]}>Start</button>
    </Link>
  );
}

export default StartButton;
