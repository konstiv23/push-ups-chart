import Chart from "./features/chart/Chart";
import "./App.css";
import WorkoutControls from "./features/workoutControls/WorkoutControls";

function App() {
  return (
    <div className="App">
      <Chart />
      <WorkoutControls />
    </div>
  );
}

export default App;
