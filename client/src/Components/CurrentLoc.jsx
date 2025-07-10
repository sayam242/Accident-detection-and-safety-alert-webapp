import { useState } from "react";
import "../views/Create2.css";
import MapPicker from "./MapPicker";


export default function CurrentLoc({ sendLoc, sendErr, className, key: resetKey }) {
  const [userType, setUserType] = useState("");
  const [location, setLocation] = useState(null);
  const [err, setErr] = useState("");
  const [showMapPicker, setShowMapPicker] = useState(false);

  const locationHandler = (e) => {
    const selectedValue = e.target.value;
    setUserType(selectedValue);
    setErr(""); 
    setShowMapPicker(false); 

    if (selectedValue === "Use Current Location") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          if (sendLoc) sendLoc(newLocation);
        },
        (err) => {
          console.error("Location error:", err);
          setErr("Failed to get location. Please allow location access.");
          if (sendErr) sendErr(err.message);
        }
      );
    } else if (selectedValue === "Choose from Map") {
      setShowMapPicker(true);
    }
  };

  const handleMapLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    if (sendLoc) sendLoc(selectedLocation);
    setShowMapPicker(false); 
    setUserType(""); 
  };

  return (
    <div className={className}>
      <select
        className="form-select loginInputs"
        style={{ textAlignLast: "left" }}
        value={userType}
        onChange={locationHandler}
        id="floatingSelect"
        aria-label="Floating label select example"
        key={resetKey} 
      >
        <option value="" disabled hidden>
          Select Location Method
        </option>
        <option value="Use Current Location">Use Current Location</option>
        <option value="Choose from Map">Choose from Map</option>
      </select>

      {err && <div className="error-message">{err}</div>}

      {showMapPicker && (
        <MapPicker
          onLocationSelect={handleMapLocationSelect}
          onCancel={() => setShowMapPicker(false)}
        />
      )}
    </div>
  );
}