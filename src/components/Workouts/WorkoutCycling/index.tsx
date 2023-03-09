import React, { useContext } from "react";
import "./index.css";
import { WorkoutTypeProps } from "../../Workouts";
import MapContext from "../../../store/map-context";

export default function WorkoutCycling(props: any) {
  const ctx = useContext(MapContext);
  const moveToMarker = () => {
    ctx.flyToMarker(props.data.loc);
  };
  return (
    <li
      key={props.data.id}
      className="workout workout--cycling"
      data-id="1234567891"
      onClick={moveToMarker}
    >
      <h2 className="workout__title">Cycling on April 5</h2>
      <div className="workout__details">
        <span className="workout__icon">🚴‍♀️</span>
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
          {props.data.distance / props.data.duration}
        </span>
        <span className="workout__unit">km/h</span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">⛰</span>
        <span className="workout__value">{props.data.cadOrEle}</span>
        <span className="workout__unit">m</span>
      </div>
    </li>
  );
}
