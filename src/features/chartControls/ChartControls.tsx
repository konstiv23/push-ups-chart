import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  MAType,
  selectMaType,
  selectSmoothing,
  setMaType,
  setSmoothingInterval,
  setMaxDaysToShow,
  selectMaxDaysToShow,
} from "../settings/settingsSlice";
import styles from "./ChartControls.module.css";

function SmoothingSelect() {
  const settingsSmoothing = useAppSelector(selectSmoothing);
  const dispatch = useAppDispatch();
  const handleChange = useCallback(
    (event: React.FormEvent<HTMLSelectElement>) => {
      dispatch(setSmoothingInterval(parseInt(event.currentTarget.value) || 14));
    },
    [dispatch]
  );
  return (
    <div>
      <label htmlFor="smoothing">Smoothing:</label>
      <select
        onChange={handleChange}
        name="smoothing"
        className={styles["select"]}
        id="smoothing"
        defaultValue={`${settingsSmoothing}`}
      >
        <option value="7">7d</option>
        <option value="14">14d</option>
        <option value="28">28d</option>
      </select>
    </div>
  );
}

function MaEmaSelect() {
  const maSettings = useAppSelector(selectMaType);
  const dispatch = useAppDispatch();
  const handleChange = useCallback(
    (event: React.FormEvent<HTMLSelectElement>) => {
      dispatch(setMaType((event.currentTarget.value || "EMA") as MAType));
    },
    [dispatch]
  );
  return (
    <div>
      {/* Don't remove wrapper above, or MA will be 3 pixels higher than Smoothing in Chrome. */}
      <select
        name="MA-EMA"
        className={styles["select"]}
        defaultValue={maSettings}
        onChange={handleChange}
      >
        <option value="MA">MA</option>
        <option value="EMA">EMA</option>
      </select>
    </div>
  );
}

function SettingButton() {
  return (
    <Link to="/settings">
      <img
        className={styles["settings-icon"]}
        src={`${process.env.PUBLIC_URL}/settings-gear.svg`}
        alt="settings"
      />
    </Link>
  );
}

function TimeSpan() {
  const maxDays = useAppSelector(selectMaxDaysToShow);
  const dispatch = useAppDispatch();
  const handleChange = useCallback(
    (event: React.FormEvent<HTMLSelectElement>) => {
      dispatch(setMaxDaysToShow(parseInt(event.currentTarget.value) || 30));
    },
    [dispatch]
  );

  return (
    <div>
      <label htmlFor="timespan">Timespan: </label>
      <select
        name="timespan"
        id="timespan"
        className={styles["select"]}
        defaultValue={`${maxDays}`}
        onChange={handleChange}
      >
        <option value="30">30 days</option>
        <option value="365">365 days</option>
      </select>
    </div>
  );
}

function ChartControls({ numDays }: { numDays: number }) {
  return (
    <section className={styles["chart-controls"]}>
      <TimeSpan />
      <span className={styles["smoothing-ma-settings"]}>
        <SmoothingSelect />
        <MaEmaSelect />
        <SettingButton />
      </span>
    </section>
  );
}

export default ChartControls;
