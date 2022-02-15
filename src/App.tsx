import Chart from "./features/chart/Chart";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import StartButton from "./features/startButton/StartButton";
import Workout from "./features/workout/Workout";
import Settings from "./features/settings/Settings";
import { Link } from "react-router-dom";
import DemoAlert from "./features/demoAlert/DemoAlert";

function Home() {
  return (
    <main className="Home">
      <Link to="/settings">
        <img
          className="settings-icon"
          src="/settings-gear.svg"
          alt="settings"
        />
      </Link>
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
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<div>Error 404: Path not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
