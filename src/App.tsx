import Chart from "./features/chart/Chart";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import StartButton from "./features/startButton/StartButton";
import Workout from "./features/workout/Workout";
import Options from "./features/options/Options";
import DemoAlert from "./features/demoAlert/DemoAlert";

function Home() {
  return (
    <main className="Home">
      <DemoAlert />
      <Chart />
      <StartButton />
    </main>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="workout" element={<Workout />} />
        <Route path="settings" element={<Options />} />
        <Route path="*" element={<div>Error 404: Path not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
