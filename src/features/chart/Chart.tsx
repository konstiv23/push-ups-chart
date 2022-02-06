import { PureComponent, useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { RepsDayMA, selectRepsDays } from "./chartSlice";
import { dayNumberToStr } from "../../utils/dateManipulation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import CustomTooltip from "../customTooltip/CustomTooltip";
import TodayStatus from "../todayStatus/TodayStatus";

export enum ChartFeeds {
  repsOnDay = "Push-Ups On Day",
  movAv = "Moving Average",
  repsLatest = "Push-Ups Latest",
  movAvLatest = "Moving Average Latest",
}

type Point = {
  name: string;
  [ChartFeeds.repsOnDay]: number;
  [ChartFeeds.movAv]: number;
  [ChartFeeds.repsLatest]?: number;
  [ChartFeeds.movAvLatest]?: number;
};

function getLatest(repsDaysMA: RepsDayMA[]) {
  return {
    reps: repsDaysMA[repsDaysMA.length - 1].reps,
    movAv: repsDaysMA[repsDaysMA.length - 2].movAverage,
  };
}

function repDaysToPoints(repsDays: RepsDayMA[]) {
  const points: Point[] = repsDays.map((r) => ({
    name: dayNumberToStr(r.day),
    [ChartFeeds.repsOnDay]: r.reps,
    [ChartFeeds.movAv]: r.movAverage,
  }));
  const latest = getLatest(repsDays);
  points[points.length - 1][ChartFeeds.repsLatest] = latest.reps;
  if (latest.reps !== latest.movAv) {
    points[points.length - 2][ChartFeeds.movAvLatest] = latest.movAv;
  }
  return points;
}

type LabelProps = {
  x: number;
  y: number;
  stroke: string;
  value: number;
};

class CustomizedLabel extends PureComponent<LabelProps | {}> {
  render() {
    const { x, y, stroke, value } = this.props as LabelProps;

    return (
      <text x={x} y={y} dy={-6} fill={stroke} fontSize={16} textAnchor="end">
        {value}
      </text>
    );
  }
}

function Chart() {
  const repsDays = useAppSelector(selectRepsDays);
  const points = useMemo(() => repDaysToPoints(repsDays), [repsDays]);
  const latest = getLatest(repsDays);
  return (
    <div>
      <div style={{ textAlign: "left", marginLeft: "8px", lineHeight: "40px" }}>
        Last {points.length} days:
      </div>
      <LineChart
        width={Math.min(document.body.clientWidth, 475)}
        height={400}
        data={points}
        margin={{
          top: 5,
          right: 14,
          left: -20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={5} />
        <YAxis tickCount={8} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dataKey={ChartFeeds.repsOnDay}
          type="monotone"
          stroke="#82ca9d"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          isAnimationActive={false}
        />
        <Line
          dataKey={ChartFeeds.movAv}
          type="monotone"
          stroke="#039BE5"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
          activeDot={false}
        />
        <Line
          dataKey={ChartFeeds.repsLatest}
          label={<CustomizedLabel />}
          stroke="#82ca9d"
          strokeWidth={2}
          isAnimationActive={false}
          activeDot={false}
        />
        <Line
          dataKey={ChartFeeds.movAvLatest}
          label={<CustomizedLabel />}
          stroke="#039BE5"
          strokeWidth={2}
          isAnimationActive={false}
          activeDot={false}
        />
      </LineChart>
      <TodayStatus reps={latest.reps} movAv={latest.movAv} />
    </div>
  );
}

export default Chart;
