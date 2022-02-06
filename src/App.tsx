import Chart from "./features/chart/Chart";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import StartButton from "./features/startButton/StartButton";
import Workout from "./features/workout/Workout";

function Home() {
  return (
    <>
      <Chart />
      <StartButton />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="workout" element={<Workout />} />
        <Route path="*" element={<div>Error 404: Path not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
