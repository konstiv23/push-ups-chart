import React from "react";
import { Counter } from "./features/counter/Counter";
import Chart from "./features/chart/Chart";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Counter />
      <Chart />
    </div>
  );
}

export default App;
