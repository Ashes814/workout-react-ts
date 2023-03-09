import React, { useState, useRef } from "react";
import MapView from "./components/MapView";
import Workouts from "./components/Workouts";
import MapContext from "./store/map-context";
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
  const [position, setPosition] = useState([31.5, 121.55]);
  const [map, setMap] = useState<any>(null);
  const getLoc = (loc: number[]) => loc;

  const addWorkoutHandler = (workoutData: WorkoutType) => {
    // const loc = getLoc();
    // console.log(loc);
    workoutData.loc = position;
    setData([...data, workoutData]);
  };

  const flyToMarker = (loc: any) => {
    map.flyTo(loc, map.getZoom(13));
  };
  const [data, setData] = useState(demoData);
  return (
    <MapContext.Provider
      value={{ flyToMarker: flyToMarker, map: map, setMap: setMap }}
    >
      <div className="App">
        <Workouts
          data={data}
          submitWorkout={addWorkoutHandler}
          flyToMarker={flyToMarker}
        />
        <div id="map-container" className="map-container">
          <MapView
            data={data}
            getLoc={getLoc}
            setPosition={setPosition}
            position={position}
            flyToMarker={flyToMarker}
          />
        </div>
      </div>
    </MapContext.Provider>
  );
}

export default App;
