import React from "react";
import { Counter } from "./features/counter/Counter";
import Chart from "./features/chart/Chart";
import "./App.css";
import WorkoutControls from "./features/workoutControls/WorkoutControls";

function App() {
  return (
    <div className="App">
      <Counter />
      <Chart />
      <WorkoutControls />
    </div>
  );
}

export default App;
