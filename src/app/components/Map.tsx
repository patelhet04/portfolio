import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const LocationMarker: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const locateUser = () => {
      map.locate().on("locationfound", function (e) {
        const coords = e.latlng;
        const radius = e.accuracy;

        const marker = L.marker(coords, {
          icon: new L.Icon({
            iconUrl: "/marker-icon.png",
            iconRetinaUrl: "/marker-icon-2x.png",
            shadowUrl: "/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          }),
        });

        marker
          .addTo(map)
          .bindPopup(`You are within ${radius} meters from this point`)
          .openPopup();

        L.circle(coords, { radius }).addTo(map);
      });
    };

    // Ensure we are running in the browser
    if (typeof window !== "undefined") {
      locateUser();
    }
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
