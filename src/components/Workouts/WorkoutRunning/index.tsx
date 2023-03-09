import React, { useContext } from "react";
import "./index.css";
import MapContext from "../../../store/map-context";

export default function WorkoutRunning(props: any) {
  const ctx = useContext(MapContext);
  const moveToMarker = () => {
    ctx.flyToMarker(props.data.loc);
  };
  return (
    <li
      key={props.data.id}
      className="workout workout--running"
      data-id="1234567890"
      onClick={moveToMarker}
    >
      <h2 className="workout__title">Running on April 14</h2>
      <div className="workout__details">
        <span className="workout__icon">🏃‍♂️</span>
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
          {props.data.duration / props.data.distance}
        </span>
        <span className="workout__unit">min/km</span>
      </div>
      <div className="workout__details">
        <span className="workout__icon">🦶🏼</span>
        <span className="workout__value">{props.data.cadOrEle}</span>
        <span className="workout__unit">spm</span>
      </div>
    </li>
  );
}
