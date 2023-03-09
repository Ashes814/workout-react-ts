import React, { useRef, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "./index.css";
import { WorkoutType } from "../../../App";

export interface WorkoutBlankProps {
  submitWorkout: (workoutData: WorkoutType) => void;
}

export default function Workout(props: WorkoutBlankProps) {
  const typeSelect = useRef<HTMLSelectElement>(null);
  const distanceInput = useRef<HTMLInputElement>(null);
  const durationInput = useRef<HTMLInputElement>(null);
  const cadInput = useRef<HTMLInputElement>(null);
  const eleInput = useRef<HTMLInputElement>(null);
  const cadRef = useRef<HTMLDivElement>(null);
  const eleRef = useRef<HTMLDivElement>(null);

  const [showType, setShowType] = useState("running");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      id: "3",
      type: typeSelect.current!.value,
      loc: [31.6, 121.4],
      distance: +distanceInput.current!.value,
      duration: +durationInput.current!.value,
      cadOrEle:
        typeSelect.current!.value === "running"
          ? +cadInput.current!.value
          : +eleInput.current!.value,
    };

    props.submitWorkout(submitData);

    distanceInput.current!.value = "";
    durationInput.current!.value = "";
    cadInput.current!.value = "";
    eleInput.current!.value = "";
  };

  const typeChangeHandler = (e: React.ChangeEvent) => {
    e.preventDefault();
    setShowType(typeSelect.current!.value);
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div className="form__row">
          <label className="form__label">Type</label>
          <select
            className="form__input form__input--type"
            ref={typeSelect}
            onChange={typeChangeHandler}
          >
            <option value="running">Running</option>
            <option value="cycling">Cycling</option>
          </select>
        </div>
        <div className="form__row">
          <label className="form__label">Distance</label>
          <input
            className="form__input form__input--distance"
            placeholder="km"
            ref={distanceInput}
          />
        </div>
        <div className="form__row">
          <label className="form__label">Duration</label>
          <input
            className="form__input form__input--duration"
            placeholder="min"
            ref={durationInput}
          />
        </div>

        <div
          className={`form__row ${
            showType === "running" ? null : "form__row--hidden"
          }`}
          ref={cadRef}
        >
          <label className="form__label">Cadence</label>
          <input
            className="form__input form__input--cadence"
            placeholder="step/min"
            ref={cadInput}
          />
        </div>
        <div
          className={`form__row ${
            showType === "cycling" ? null : "form__row--hidden"
          }`}
          ref={eleRef}
        >
          <label className="form__label">Elev Gain</label>
          <input
            className="form__input form__input--elevation"
            placeholder="meters"
            ref={eleInput}
          />
        </div>
        <button className="form__btn">OK</button>
      </form>
    </div>
  );
}
