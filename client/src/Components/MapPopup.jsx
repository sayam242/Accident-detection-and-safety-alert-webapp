import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Routing Component (Hospital -> Accident)
function Routing({ dest, hospiloc }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !dest || !hospiloc) return;

    // dest = accident [lng, lat]
    // hospiloc = hospital [lng, lat]

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(hospiloc[1], hospiloc[0]), // Hospital
        L.latLng(dest[1], dest[0])          // Accident
      ],

      show: false,
      collapsible: false,
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,

      lineOptions: {
        styles: [{ color: "#e03232", weight: 6 }]
      }
    }).addTo(map);

    // remove floating panel if any
    const panel = document.querySelector(".leaflet-routing-container");
    if (panel) panel.remove();

    return () => map.removeControl(routingControl); // cleanup
  }, [map, dest, hospiloc]);

  return null;
}

export default function MapPopup({ coords, hospiloc }) {
  console.log("hospital location in popup", hospiloc);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const [lng, lat] = coords; // accident coords are [lng, lat]
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        if (data && data.display_name) {
          setAddress(data.display_name);
        } else {
          setAddress("Unknown location");
        }
      } catch (err) {
        console.error("Reverse geocoding error:", err);
        setAddress("Error fetching address");
      }
    };

    if (coords && coords.length === 2) {
      fetchAddress();
    }
  }, [coords]);

  if (!coords || coords.length !== 2 || typeof coords[0] !== "number") {
    return <p>Invalid or missing accident coordinates.</p>;
  }

  if (!hospiloc) {
  return <p>Invalid or missing hospital coordinates.</p>;
}

let hospitalCoords;
if (typeof hospiloc === "string") {
  // Convert "76.7557632,30.72" → [76.7557632, 30.72]
  hospitalCoords = hospiloc.split(",").map(Number);
} else {
  hospitalCoords = hospiloc;
}

if (!hospitalCoords || hospitalCoords.length !== 2 || isNaN(hospitalCoords[0])) {
  return <p>Invalid hospital coordinates format.</p>;
}

const accidentPos = { lat: coords[1], lng: coords[0] };
const hospitalPos = { lat: hospitalCoords[1], lng: hospitalCoords[0] };
console.log("Accident position:", accidentPos);
console.log("Hospital position:", hospitalPos);


  return (
    <div className="w-full h-auto rounded-lg overflow-hidden">
      {address && (
        <div className="bg-white text-sm text-gray-800 font-medium py-1 px-2 mb-2 shadow-sm rounded text-center">
          {address}
        </div>
      )}

      <div className="w-full h-[189px] rounded-lg overflow-hidden">
        <MapContainer
          center={accidentPos}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Accident Marker */}
          <Marker position={accidentPos}>
            <Popup>Accident Location</Popup>
          </Marker>

          {/* Hospital Marker */}
          <Marker position={hospitalPos}>
            <Popup>Hospital Location</Popup>
          </Marker>

          {/* Route from Hospital → Accident */}
          <Routing dest={coords} hospiloc={hospitalCoords} />
        </MapContainer>
      </div>
    </div>
  );
}
