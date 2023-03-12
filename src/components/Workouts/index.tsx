import React, { useContext } from "react";
import WorkoutBlank from "./WorkoutBlank";
import Workout from "./Workout";
import Logo from "../../img/logo.png";
import "./index.css";
import { WorkoutType } from "../../App";
import MapContext from "../../store/map-context";

export default function Workouts() {
  const ctx = useContext(MapContext);
  return (
    <div className="sidebar">
      <img src={Logo} alt="Logo" className="logo" />

      {/* 渲染空运动数据表单 */}
      <WorkoutBlank />

      {/* 渲染workout数据 */}
      <div className="workouts__container">
        {ctx.data.map((workout: WorkoutType) => {
          return (
            <Workout key={workout.id} data={workout} type={workout.type} />
          );
        })}
      </div>

      {/* 页脚 */}
      <p className="copyright">
        &copy; Copyright by - Jonas Schmedtmann. Modified with React +
        TypeScript by 欧欧.
      </p>
    </div>
  );
}
