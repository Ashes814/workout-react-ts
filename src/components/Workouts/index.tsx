import React from "react";
import WorkoutBlank from "./WorkoutBlank";
import WorkoutCycling from "./WorkoutCycling";
import WorkoutRunning from "./WorkoutRunning";
import Logo from "../../img/logo.png";
import "./index.css";
import { WorkoutType } from "../../App";

export interface WorkoutTypeProps {
  data: WorkoutType[];
}

export default function Workouts(props: WorkoutTypeProps) {
  return (
    <div className="sidebar">
      <img src={Logo} alt="Logo" className="logo" />
      <WorkoutBlank />

      {props.data.map((workout) => {
        return workout.type === "running" ? (
          <WorkoutRunning key={workout.id} data={workout} />
        ) : (
          <WorkoutCycling key={workout.id} data={workout} />
        );
      })}

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
