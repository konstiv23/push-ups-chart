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

function repDaysToPoints(repsDays: RepsDayMA[]) {
  const points: Point[] = repsDays.map((r) => ({
    name: dayNumberToStr(r.day),
    [ChartFeeds.repsOnDay]: r.reps,
    [ChartFeeds.movAv]: r.movAverage,
  }));
  points[points.length - 1][ChartFeeds.repsLatest] =
    repsDays[repsDays.length - 1].reps;
  points[points.length - 2][ChartFeeds.movAvLatest] =
    repsDays[repsDays.length - 2].movAverage;
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
      <text x={x} y={y} dy={-6} fill={stroke} fontSize={16} textAnchor="middle">
        {value}
      </text>
    );
  }
}

function Chart() {
  const repsDays = useAppSelector(selectRepsDays);
  const points = useMemo(() => repDaysToPoints(repsDays), [repsDays]);

  return (
    <div>
      <LineChart
        width={500}
        height={300}
        data={points}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={5} />
        <YAxis />
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
    </div>
  );
}

export default Chart;
