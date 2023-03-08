import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L, { LeafletMouseEvent, LatLngExpression } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "./index.css";

function MyComponent() {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    31.5, 121.5,
  ]);

  useMapEvents({
    click: (e) => {
      console.log(markerPosition);
      console.log(e.latlng);
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      // loc = e.latlng;
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });
  return (
    <Marker
      position={markerPosition}
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

export default function MapView() {
  // const map = L.map("map-container").setView([51.505, -0.09], 13);

  return (
    // <div id="map-container" className="map-container"></div>
    <MapContainer
      className="map-container"
      center={[31.5, 121.5]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />

      <MyComponent />
    </MapContainer>
  );
}
