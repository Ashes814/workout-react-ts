import React, { useRef, useState, useContext } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "./index.css";
import { WorkoutType } from "../../../App";
import MapContext from "../../../store/map-context";

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

  const ctx = useContext(MapContext);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date();

    if (
      +distanceInput.current!.value <= 0 ||
      +durationInput.current!.value <= 0 ||
      +cadInput.current!.value < 0 ||
      +eleInput.current!.value < 0
    ) {
      alert("必须大于0");
      return;
    }

    if (
      !Number.isFinite(+distanceInput.current!.value) ||
      !Number.isFinite(+durationInput.current!.value) ||
      !Number.isFinite(+cadInput.current!.value) ||
      !Number.isFinite(+eleInput.current!.value)
    ) {
      alert("必须是数字");
      return;
    }

    const submitData = {
      id: "3",
      date: date,
      type: typeSelect.current!.value,
      loc: [31.6, 121.4],
      distance:
        +distanceInput.current!.value > 0 ? +distanceInput.current!.value : 0,
      duration:
        +durationInput.current!.value > 0 ? +distanceInput.current!.value : 0,
      cadOrEle:
        typeSelect.current!.value === "running"
          ? +cadInput.current!.value > 0
            ? +cadInput.current!.value
            : 0
          : +eleInput.current!.value > 0
          ? +eleInput.current!.value
          : 0,
    };

    props.submitWorkout(submitData);

    ctx.setShowBlank(false);

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
    <form
      className={`form ${ctx.showBlank ? "" : "hidden"}`}
      onSubmit={submitHandler}
    >
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
  );
}
