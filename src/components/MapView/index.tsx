import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "./index.css";
import MapMarker from "./MapMarker";
import MapContext from "../../store/map-context";
import { WorkoutType } from "../../App";
import { LatLngExpression } from "leaflet";

export default function MapView() {
  const ctx = useContext(MapContext);
  return (
    // 创建地图容器
    <MapContainer
      className="map-container"
      // 设置初始化地图中心
      center={[31.5, 121.5]}
      // 设置缩放级别
      zoom={13}
      //是否使用滚轮缩放
      scrollWheelZoom={false}
    >
      {/* 瓦片 */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {/* 渲染已有数据 */}
      {ctx.data.map((workout: WorkoutType) => {
        return (
          <Marker
            key={workout.id}
            position={workout.loc as LatLngExpression}
            // 定义标记图标
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
            {/* 定义弹窗内容 */}
            <Popup>
              {workout.type} at
              {`${workout.date.getMonth() + 1}/${workout.date.getDate()}`}.
            </Popup>
          </Marker>
        );
      })}

      {/* 添加新增数据标记 */}
      <MapMarker />
    </MapContainer>
  );
}
