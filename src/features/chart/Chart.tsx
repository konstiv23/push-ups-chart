import { PureComponent, useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { dayNumberToStr } from "../../utils/dateManipulation";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CustomTooltip from "../customTooltip/CustomTooltip";
import TodayStatus from "../todayStatus/TodayStatus";
import { RepsDayMA, selectRepsDaysMA } from "./selectRepsDaysMA";

export enum ChartFeeds {
  repsOnDay = "Push-Ups On Day",
  movAv = "Moving Average",
  repsLatest = "Push-Ups Latest",
  movAvLatest = "Moving Average Latest",
}

const REPS_COLOR = "#81D6A0";
const MOV_AV_COLOR = "#0293DB";

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
  const repsDays = useAppSelector(selectRepsDaysMA);
  const points = useMemo(() => repDaysToPoints(repsDays), [repsDays]);
  const latest = getLatest(repsDays);
  return (
    <div>
      <div
        style={{ textAlign: "left", paddingLeft: "8px", lineHeight: "45px" }}
      >
        Last {points.length} days:
      </div>
      <ComposedChart
        width={Math.min(document.body.clientWidth, 475)}
        height={400}
        data={points}
        margin={{
          top: 5,
          right: 14,
          left: -20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" interval={5} />
        <YAxis tickCount={8} />
        <Tooltip content={<CustomTooltip />} />
        <Legend align="right" />
        <Bar
          dataKey={ChartFeeds.repsOnDay}
          fill={REPS_COLOR}
          isAnimationActive={false}
        />
        <Line
          dataKey={ChartFeeds.movAv}
          type="monotone"
          stroke={MOV_AV_COLOR}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
          activeDot={false}
        />
        <Line
          dataKey={ChartFeeds.repsLatest}
          label={<CustomizedLabel />}
          stroke={REPS_COLOR}
          strokeWidth={2}
          isAnimationActive={false}
          activeDot={false}
          legendType="none"
        />
        <Line
          dataKey={ChartFeeds.movAvLatest}
          label={<CustomizedLabel />}
          stroke={MOV_AV_COLOR}
          strokeWidth={2}
          isAnimationActive={false}
          activeDot={false}
          legendType="none"
        />
      </ComposedChart>
      <Legend />
      <TodayStatus reps={latest.reps} movAv={latest.movAv} />
    </div>
  );
}

export default Chart;
