"use client";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

// Fix marker icons
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ setSelected }) {
  useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        setSelected({
          lat,
          lng,
          address: data.display_name || "Unknown address",
        });
      } catch (err) {
        console.error(err);
      }
    },
  });
  return null;
}

export default function UserMap({ setAddress }) {
  const [position, setPosition] = useState(null);

  // Detect user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();
          setPosition({ lat, lng });
          setAddress(data.display_name || "Unknown address");
        } catch (err) {
          console.error(err);
        }
      });
    }
  }, [setAddress]);

  return (
    <MapContainer
      center={position || [31.6340, 74.8723]} // default Amritsar
      zoom={14}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {position && <Marker position={[position.lat, position.lng]} />}
      <LocationMarker
        setSelected={(loc) => {
          setPosition({ lat: loc.lat, lng: loc.lng });
          setAddress(loc.address);
        }}
      />
    </MapContainer>
  );
}
