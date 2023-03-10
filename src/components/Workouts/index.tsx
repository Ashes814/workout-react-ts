import React, { useContext } from "react";
import WorkoutBlank from "./WorkoutBlank";
import WorkoutCycling from "./WorkoutCycling";
import WorkoutRunning from "./WorkoutRunning";
import Logo from "../../img/logo.png";
import "./index.css";
import { WorkoutType } from "../../App";
import MapContext from "../../store/map-context";

export interface WorkoutTypeProps {
  data: WorkoutType[];
  submitWorkout: (workoutData: WorkoutType) => void;
  flyToMarker: (map: any) => void;
}

export default function Workouts(props: WorkoutTypeProps) {
  const ctx = useContext(MapContext);
  return (
    <div className="sidebar">
      <img src={Logo} alt="Logo" className="logo" />

      {/* {ctx.showBlank ? ( */}
      <WorkoutBlank submitWorkout={props.submitWorkout} />
      {/* ) : null} */}

      <div className="workouts__container">
        {props.data.map((workout) => {
          return workout.type === "running" ? (
            <WorkoutRunning
              key={workout.id}
              data={workout}
              flyToMarker={props.flyToMarker}
            />
          ) : (
            <WorkoutCycling key={workout.id} data={workout} />
          );
        })}
      </div>

      <p className="copyright">
        &copy; Copyright by -
        <a
          className="twitter-link"
          target="_blank"
          href="https://twitter.com/jonasschmedtman"
        >
          Jonas Schmedtmann
        </a>
        . Modified with React + TypeScript by OO.
      </p>
    </div>
  );
}
