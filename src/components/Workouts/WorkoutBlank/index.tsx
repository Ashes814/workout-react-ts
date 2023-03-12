import React, { useRef, useState, useContext } from "react";
import "./index.css";
import MapContext from "../../../store/map-context";
import { v4 } from "uuid";

export default function WorkoutBlank() {
  // 通过useRef选择所有虚拟DOM
  const typeSelect = useRef<HTMLSelectElement>(null);
  const distanceInput = useRef<HTMLInputElement>(null);
  const durationInput = useRef<HTMLInputElement>(null);
  const cadInput = useRef<HTMLInputElement>(null);
  const eleInput = useRef<HTMLInputElement>(null);
  const cadRef = useRef<HTMLDivElement>(null);
  const eleRef = useRef<HTMLDivElement>(null);
  // 初始化showType用于显示running特有的表单或着cycling特有的表单
  const [showType, setShowType] = useState("running");
  // 引入context
  const ctx = useContext(MapContext);

  const clearInput = () => {
    distanceInput.current!.value = "";
    durationInput.current!.value = "";
    cadInput.current!.value = "";
    eleInput.current!.value = "";
  };
  // 表单提交时,添加运动数据
  const submitHandler = (e: React.FormEvent) => {
    //防止页面自动刷新
    e.preventDefault();

    // 设置表单提交日期
    const date = new Date();

    const distanceValue = +distanceInput.current!.value;
    const durationValue = +durationInput.current!.value;
    const cadValue = +cadInput.current!.value;
    const eleValue = +eleInput.current!.value;
    const type = typeSelect.current!.value;

    // GUARD CLAUSE
    if (
      distanceValue <= 0 ||
      durationValue <= 0 ||
      // 这两个必须同时小于等于0时才弹出错误弹窗,若使用或运算符,则会出现bug
      (cadValue <= 0 && eleValue <= 0)
    ) {
      alert("输入数值必须大于0");
      return;
    }

    if (
      !Number.isFinite(distanceValue) ||
      !Number.isFinite(durationValue) ||
      !Number.isFinite(cadValue) ||
      !Number.isFinite(eleValue)
    ) {
      alert("输入内容必须是数字");
      return;
    }

    const submitData = {
      id: v4(),
      date: date,
      type: type,
      loc: [31.6, 121.4],
      distance: distanceValue,
      duration: durationValue,
      cadOrEle: type === "running" ? cadValue : eleValue,
    };

    // 向app中的data添加数据
    ctx.addWorkoutHandler(submitData);
    //  关闭空白表单数据
    ctx.setShowBlank(false);
    // 清空表单
    clearInput();
  };

  const typeChangeHandler = (e: React.ChangeEvent) => {
    e.preventDefault();
    // 清空表单
    clearInput();
    // 改变显示的运动项目
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
