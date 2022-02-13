import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { completelyClear } from "../chart/chartSlice";
import styles from "./Options.module.css";

function Options() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const complete = useCallback(() => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all data?"
    );
    if (confirmed) {
      dispatch(completelyClear());
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate]);

  return (
    <main className={styles.settings}>
      <h1>Options</h1>
      <div className={styles.hr} />
      <button onClick={complete}>Clear All Data</button>
      <div className={styles.hr} />
      <p>
        Developer email:{" "}
        <a href="mailto:konstiv23@gmail.com">konstiv23@gmail.com</a>
      </p>
      <div className={styles.hr} />
      <a
        className={styles.github}
        href="https://github.com/konstiv23/push-ups-chart"
      >
        <img
          className={styles["github-logo"]}
          src={`${process.env.PUBLIC_URL}/github-logo.svg`}
          alt="Github logo"
        />
        Source code on Github
      </a>
    </main>
  );
}

export default Options;
