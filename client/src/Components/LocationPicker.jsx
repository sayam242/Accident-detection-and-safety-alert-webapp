// LocationPickerWithSearch.jsx
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ----- one‑time Leaflet icon fix -----
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png"
});

const DEFAULT_CENTER = [28.6139, 77.2090]; // Delhi

const FlyToLocation = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, 13);
  }, [coords, map]);
  return null;
};

const ClickHandler = ({ setCoords, sendLoc }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoords([lat, lng]);
      sendLoc({ lat, lng });
    }
  });
  return null;
};

export default function LocationPickerWithSearch({ sendLoc }) {
  const [coords, setCoords] = useState(null);
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}`
      );
      const data = await res.json();
      if (data.length) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setCoords([lat, lng]);
        sendLoc({ lat, lng });
      } else {
        alert("Location not found");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  return (
    <div>
      <h2>Select Accident Location</h2>
      <div style={{ display:"flex",alignItems:"center"}}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} style={{ textAlign: "left", marginRight: 20, padding: 5  }} placeholder="Type address..." className="form-control" ></input>
                <label style={{fontSize:"12px", paddingTop:"2px"}} htmlFor="floatingTextareaname"></label>
        <button onClick={handleSearch} type="button" className="btn btn-danger" style={{width:"80px"}} >Select</button>
      </div>
      {/* ✅ Map is always visible */}
      <MapContainer
        center={coords || DEFAULT_CENTER}
        zoom={13}
        style={{ height: 400, width: "100%", marginTop: 10 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* ✅ Marker is only shown if coords exist */}
        {coords && <Marker position={coords} />}
        
        <ClickHandler setCoords={setCoords} sendLoc={sendLoc} />
        {coords && <FlyToLocation coords={coords} />}
      </MapContainer>

      {coords && (
        <>
          <p>Latitude: {coords[0]}</p>
          <p>Longitude: {coords[1]}</p>
        </>
      )}
    </div>
  );
}
