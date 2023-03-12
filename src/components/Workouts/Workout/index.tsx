import React, { useContext } from "react";
import "./index.css";
import MapContext from "../../../store/map-context";
import { WorkoutType } from "../../../App";

interface WorkoutPropsType {
  data: WorkoutType;
  type: string;
}
export default function Workout(props: WorkoutPropsType) {
  const ctx = useContext(MapContext);
  const moveToMarker = () => {
    ctx.flyToMarker(props.data.loc);
  };
  return (
    <li
      key={props.data.id}
      className={`workout ${
        props.type === "running" ? "workout--running" : "workout--cycling"
      }`}
      data-id="1234567891"
      onClick={moveToMarker}
    >
      <h2 className="workout__title">
        {`${props.type === "running" ? "Running" : "Cycling"}`} on
        {` ${props.data.date.getMonth() + 1}.${props.data.date.getDate()}`}
      </h2>
      <div className="workout__details">
        <span className="workout__icon">{`${
          props.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
        }`}</span>
        <span className="workout__value">{props.data.distance}</span>
        <span className="workout__unit">km</span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">⏱</span>
        <span className="workout__value">{props.data.duration}</span>
        <span className="workout__unit">min</span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">⚡️</span>
        <span className="workout__value">
          {`${
            props.type === "running"
              ? `${props.data.duration / props.data.distance}`
              : `${props.data.distance / props.data.duration}`
          }`}
        </span>
        <span className="workout__unit">{`${
          props.type === "running" ? "min/km" : "km/h"
        }`}</span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">{`${
          props.type === "running" ? "🦶🏼" : "⛰"
        }`}</span>
        <span className="workout__value">{props.data.cadOrEle}</span>
        <span className="workout__unit">{`${
          props.type === "running" ? "spm" : "m"
        }`}</span>
      </div>
    </li>
  );
}
