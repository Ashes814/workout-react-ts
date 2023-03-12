import React, { useContext } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import MapContext from "../../../store/map-context";

export default function MapMarker() {
  const ctx = useContext(MapContext);

  // 通过useMapEvents绑定在地图上的单击事件
  const map = useMapEvents({
    click: (e) => {
      // 设置单击点坐标
      ctx.setPosition([e.latlng.lat, e.latlng.lng]);
      // 弹出空白运动数据表格
      ctx.setShowBlank(true);
    },
  });

  // 将map对象返回给App组件
  ctx.setMap(map);

  return (
    <Marker
      position={ctx.position}
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
    >
      <Popup>请输入健身信息...</Popup>
    </Marker>
  );
}
