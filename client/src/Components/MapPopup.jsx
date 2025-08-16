import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect,useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import axios from "axios";


import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Routing({ dest }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !dest) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;

        const routingControl = L.Routing.control({
          waypoints: [
            L.latLng(latitude,  longitude),   // current
            L.latLng(dest[1],   dest[0])      // accident
          ],

          /***  HIDE the floating panel  ***/
          show      : false,                 // don’t create itinerary UI
          collapsible: false,                // (safety)

          /***  DISABLE any interaction  ***/
          addWaypoints        : false,       // no click‑to‑add
          draggableWaypoints  : false,       // no drag markers
          routeWhileDragging  : false,
          /***  OPTIONAL: thinner red line  ***/
          lineOptions: {
            styles: [{ color: '#e03232', weight: 6 }]
          }

          
        }).addTo(map);
        
        

        /* absolutely remove leftover DOM (older versions) */
        const panel = document.querySelector('.leaflet-routing-container');
        if (panel) panel.remove();
      },
      err => console.error('Geolocation error:', err)
    );
  }, [map, dest]);

  return null;
}



export default function MapPopup({ coords /* [lat, lng] */ }) {

  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const [lng, lat] = coords; // your coords are [lng, lat]
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
    return <p>Invalid or missing coordinates.</p>;
  }

  const position = { lat: coords[1], lng: coords[0] };

  return (
    <div className="w-full h-auto rounded-lg overflow-hidden">
  
       {/*  Address - make background and padding visible */}
  {address && (
    <div className="bg-white text-sm text-gray-800 font-medium py-1 px-2 mb-2 shadow-sm rounded text-center">
       {address}
    </div>
  )}
    <div className="w-full h-[189px] rounded-lg overflow-hidden">
      
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{`${coords[0]}, ${coords[1]}`}</Popup>
        </Marker>
        {/* route from current location to accident */}
        <Routing dest={coords} />
      </MapContainer>

      

    </div>
    </div>
  );
}
