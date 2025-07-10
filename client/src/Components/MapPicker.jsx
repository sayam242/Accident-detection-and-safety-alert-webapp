import React, { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "400px" };
const center = { lat: 28.6139, lng: 77.2090 };

function MapPicker({ onLocationSelect, onCancel }) {
  const [marker, setMarker] = useState(null);

  const handleMapClick = useCallback(
    (event) => {
      const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      setMarker(location);
      onLocationSelect(location);
    },
    [onLocationSelect]
  );

  return (
    <LoadScript googleMapsApiKey="AIzaSyCHvXvJqzUred2A7c6EE5mewhpjQTWvTJM">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onClick={handleMapClick}>
        {marker && <Marker position={marker} />}
      </GoogleMap>
      <button onClick={onCancel}>Cancel</button>
    </LoadScript>
  );
}

export default MapPicker;