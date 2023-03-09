import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LeafletMouseEvent, LatLngExpression } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import "./index.css";
import MapMarker from "./MapMarker";

export default function MapView(props: any) {
  // const map = L.map("map-container").setView([51.505, -0.09], 13);
  console.log(props.data);
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
      {props.data.map((workout: any) => {
        return (
          <Marker
            position={workout.loc}
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
      })}
      <MapMarker
        getLoc={props.getLoc}
        setPosition={props.setPosition}
        position={props.position}
        flyToMarker={props.flyToMarker}
      />
    </MapContainer>
  );
}
