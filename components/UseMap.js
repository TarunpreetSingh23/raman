"use client";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Default marker fix
const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

// Punjab bounds (approximate lat/lng box)
const punjabBounds = [
  [29.5, 73.5], // Southwest corner
  [32.7, 76.0], // Northeast corner
];

function LocationMarker({ setAddress }) {
  const [position, setPosition] = useState(null);
  const map = useMap();

  // Auto-detect user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition({ lat, lng });
          map.flyTo([lat, lng], 13);

          // Reverse geocode with Nominatim
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await res.json();
            if (data?.display_name) {
              setAddress(data.display_name);
            }
          } catch (e) {
            console.error("Reverse geocoding failed", e);
          }
        },
        () => console.warn("User denied geolocation, showing Punjab")
      );
    }
  }, [map, setAddress]);

  // Handle click to update location
  useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setPosition({ lat, lng });

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        if (data?.display_name) {
          setAddress(data.display_name);
        }
      } catch (err) {
        console.error("Reverse geocoding error", err);
      }
    },
  });

  return position ? <Marker position={[position.lat, position.lng]} /> : null;
}

export default function UserMap({ setAddress }) {
  return (
    <MapContainer
      bounds={punjabBounds} // ✅ Fit to Punjab
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <LocationMarker setAddress={setAddress} />
    </MapContainer>
  );
}
