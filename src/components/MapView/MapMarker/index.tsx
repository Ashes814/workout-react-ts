import React, { useState, useContext } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import MapContext from "../../../store/map-context";

export default function MapMarker(props: any) {
  //   const [markerPosition, setMarkerPosition] = useState<[number, number]>([
  //     31.5, 121.5,

  //   ]);

  // const [isAdding, setIsAdding] = useState<boolean>(true);
  const ctx = useContext(MapContext);

  const map = useMapEvents({
    click: (e) => {
      //   props.getLoc([e.latlng.lat, e.latlng.lng]);

      // if (isAdding) {
      props.setPosition([e.latlng.lat, e.latlng.lng]);
      ctx.setShowBlank(true);
      // setIsAdding(false);
      // }

      // loc = e.latlng;
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });

  ctx.setMap(map);

  //   props.flyToMarker(map);

  return (
    <Marker
      position={props.position}
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
