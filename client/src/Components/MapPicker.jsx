
import React, { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const MapPicker = ({ onLocationSelect, onCancel }) => {
  const [position, setPosition] = useState(null);


  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const location = { lat: e.latlng.lat, lng: e.latlng.lng };
        setPosition(location); 
        if (onLocationSelect) onLocationSelect(location);
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  return (
    <div>
      <MapContainer
        center={[28.6139, 77.2090]} 
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default MapPicker;