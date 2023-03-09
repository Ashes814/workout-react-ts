import React, { useState, useContext } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import MapContext from "../../../store/map-context";

export default function MapMarker(props: any) {
  //   const [markerPosition, setMarkerPosition] = useState<[number, number]>([
  //     31.5, 121.5,
  //   ]);
  const ctx = useContext(MapContext);
  console.log(ctx);

  const map = useMapEvents({
    click: (e) => {
      //   console.log(markerPosition);
      console.log(e.latlng);
      //   props.getLoc([e.latlng.lat, e.latlng.lng]);
      props.setPosition([e.latlng.lat, e.latlng.lng]);
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
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
}
