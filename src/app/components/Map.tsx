// pages/map.tsx
"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { NextPage } from "next";

// ... (rest of your imports and L.Icon.Default fix)

const LocationMarker: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      const coords = e.latlng;
      const radius = e.accuracy;

      L.marker(coords)
        .addTo(map)
        .bindPopup(`You are within ${radius} meters from this point`)
        .openPopup();
      L.circle(coords, radius).addTo(map);
    });
  }, [map]);

  return null;
};

const Map: React.FC = () => {
  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;
