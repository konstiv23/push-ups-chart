import { ChartFeeds } from "../chart/Chart";
import styles from "./CustomTooltip.module.css";

type ToolTipProps = {
  active: boolean;
  payload: { name: ChartFeeds; value: number }[];
  label: string;
};

export default function CustomTooltip(props: ToolTipProps | {}) {
  const { active, payload, label } = props as ToolTipProps;

  if (active && payload && payload.length) {
    const pUps = payload.find((p) => p.name === ChartFeeds.repsOnDay);
    if (!pUps) return null;
    return (
      <div className={styles.tooltip}>
        <div>{label}</div>
        <div>Push-Ups: {pUps.value}</div>
      </div>
    );
  }
  return null;
}
