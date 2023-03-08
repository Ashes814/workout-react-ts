import React, { useState } from "react";
import MapView from "./components/MapView";
import Workouts from "./components/Workouts";
import "./App.css";

export interface WorkoutType {
  id: string;
  type: string;
  loc: number[];
  distance: number;
  duration: number;
  cadOrEle: number;
}

const demoData = [
  {
    id: "1",
    type: "running",
    loc: [31.5, 121.5],
    distance: 10,
    duration: 5,
    cadOrEle: 10,
  },
  {
    id: "2",
    type: "cycling",
    loc: [31.4, 121.4],
    distance: 20,
    duration: 10,
    cadOrEle: 20,
  },
  {
    id: "3",
    type: "running",
    loc: [31.6, 121.4],
    distance: 40,
    duration: 20,
    cadOrEle: 40,
  },
];

function App() {
  const [data, setData] = useState(demoData);
  return (
    <div className="App">
      <Workouts data={data} />
      <div id="map-container" className="map-container">
        <MapView />
      </div>
    </div>
  );
}

export default App;
