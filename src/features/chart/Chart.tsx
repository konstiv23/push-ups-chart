import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { RepsDays, selectRepsDays } from "./chartSlice";
import { dayNumberToStr } from "../../utils/dateManipulation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

enum ChartFeeds {
  repsOnDay = "Push-Ups On Day",
  movAv = "Moving Average",
  repsLatest = "Push-Ups Latest",
  movAvLatest = "Moving Average Latest"
}

function repDaysToPoints(repsDays: RepsDays) {
  return repsDays.map((r) => ({
    name: dayNumberToStr(r.day),
    [ChartFeeds.repsOnDay]: r.reps
  }));
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
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={ChartFeeds.repsOnDay}
          stroke="#82ca9d"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        {/*<Line type="monotone" dataKey={ChartFeeds.movAv} stroke="#8884d8" />*/}
      </LineChart>
    </div>
  );
}

export default Chart;
