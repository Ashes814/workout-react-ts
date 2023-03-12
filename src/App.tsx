import React, { useState } from "react";
import MapView from "./components/MapView";
import Workouts from "./components/Workouts";
import MapContext from "./store/map-context";
import "./App.css";
import { LatLngExpression, default as L } from "leaflet";

export interface WorkoutType {
  id: string;
  date: Date;
  type: string;
  loc: LatLngExpression | number[];
  distance: number;
  duration: number;
  cadOrEle: number;
}

const demoData = [
  {
    id: "1",
    date: new Date(2022, 2, 10, 12, 30, 0),
    type: "running",
    loc: [31.5, 121.5],
    distance: 10,
    duration: 5,
    cadOrEle: 10,
  },
];

function App() {
  // 初始化运动数据
  const [data, setData] = useState<WorkoutType[]>(demoData);
  // 初始化标记点坐标
  const [position, setPosition] = useState<number[]>([31.5, 121.5]);
  // 初始化leaflet中的map对象-使用useMapEvents创建
  const [map, setMap] = useState<L.Map>();
  // 初始化是否显示空白运动数据提交表单
  const [showBlank, setShowBlank] = useState<boolean>(false);
  // 添加运动数据
  const addWorkoutHandler = (workoutData: WorkoutType) => {
    // 将运动数据的坐标位置设置为单击地图中产生标记的位置
    workoutData.loc = position;
    // 设置运动数据并重新渲染组件
    setData([...data, workoutData]);
  };

  // 单击左侧运动项目列表中的数据时,能够将地图缩放至右侧对应的标记点中
  const flyToMarker = (loc: number[]) => {
    map!.flyTo(loc as LatLngExpression, 13);
  };

  return (
    <MapContext.Provider
      // 通过context传递数据
      value={{
        flyToMarker,
        map,
        setMap,
        showBlank,
        setShowBlank,
        data,
        position,
        setPosition,
        addWorkoutHandler,
      }}
    >
      <div className="App">
        <Workouts />
        <div id="map-container" className="map-container">
          <MapView />
        </div>
      </div>
    </MapContext.Provider>
  );
}

export default App;
