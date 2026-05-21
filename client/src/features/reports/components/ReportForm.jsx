import React, { useState, useRef } from "react";
import InputText from "../../common/components/InputText";
import LoginButton from "../../common/components/LoginButton";
import CurrentLoc from "../../common/components/map/CurrentLoc";
import LocationPicker from "../../common/components/map/LocationPicker";
import Modal from "../../common/components/map/Modal";
import { REPORT_TEXT } from "../constants/reportConstants";
import { useNavigate } from "react-router-dom";

export default function ReportForm({ onSubmitted }) {
  const [userType, setUserType] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [accident, setAccident] = useState({
    name: "",
    contact: "",
    severity: "",
    location: null,
    image: null,
  });
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccident((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoc = (coords) => {
    const location = coords.lat !== undefined && coords.lng !== undefined
      ? { type: "Point", coordinates: [coords.lng, coords.lat] }
      : coords;
    setAccident((prev) => ({ ...prev, location }));
    setShowMap(false);
  };

  const openCamera = async () => {
    setShowCamera(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImage(dataUrl);
      setAccident((prev) => ({ ...prev, image: dataUrl }));
      const stream = video.srcObject;
      if (stream) stream.getTracks().forEach((t) => t.stop());
      setShowCamera(false);
    }
  };

  const removePhoto = () => {
    setCapturedImage(null);
    setAccident((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accident.location) {
      alert("Please select a location on the map.");
      return;
    }
    onSubmitted(accident);
  };

  const locationHandler = (e) => {
    const val = e.target.value;
    setUserType(val);
    if (val === "Select on Map") setShowMap(true);
  };

  return (
    <form onSubmit={handleSubmit} id="reportForm" style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px" }}>
      <h2>{REPORT_TEXT.SUBMIT_TITLE}</h2>
      <InputText label="YOUR NAME" value={accident.name} name="name" type="text" onChange={handleChange} />

      <div className="form-floating loginDivs">
        <input type='text' pattern="\d*" inputMode="numeric" maxLength={10} minLength={10} value={accident.contact || ""} style={{ textAlign: "left" }} className="form-control loginInputs no-spinner" onChange={(e)=>{
          const value = e.target.value; if (/^\d*$/.test(value)) setAccident((cur)=>({...cur, contact: value}));
        }} />
        <label style={{ fontSize: "12px", paddingTop: "2px" }}>CONTACT NUMBER</label>
      </div>

      <div className="form-floating loginDivs">
        <select className="form-select loginInputs" style={{ textAlignLast: "left" }} value={accident.severity} name="severity" required onChange={handleChange}>
          <option value="" disabled hidden></option>
          <option value="critical">CRITICAL</option>
          <option value="moderate">MODERATE</option>
          <option value="low">LOW</option>
        </select>
        <label style={{ fontSize: "15px", paddingTop: "12px" }}>ACCIDENT CONDITION</label>
      </div>

      <div className="form-floating loginDivs">
        <select className="form-select loginInputs" style={{ textAlignLast: "left" }} value={userType} onChange={locationHandler} required>
          <option value="" disabled hidden></option>
          <option value="Use Current Location">Use Current Location</option>
          <option value="Select on Map">Select on Map</option>
        </select>
        <label style={{ fontSize: "15px", paddingTop: "12px" }}>LOCATION</label>
      </div>

      <div style={{ width: "100%", textAlign: "center" }}>
        {!capturedImage && (
          <button type="button" className="btn btn-secondary" onClick={openCamera}>Click Photo</button>
        )}
        {capturedImage && (
          <div>
            <img src={capturedImage} alt="Captured" style={{ width: "200px", margin: "10px 0" }} />
            <button type="button" className="btn btn-danger" onClick={removePhoto}>Remove Photo</button>
          </div>
        )}
        {showCamera && (
          <div style={{ marginTop: "10px" }}>
            <video ref={videoRef} autoPlay style={{ width: "300px" }} />
            <br />
            <button type="button" className="btn btn-primary" onClick={capturePhoto}>Capture</button>
            <button type="button" className="btn btn-secondary" onClick={()=>setShowCamera(false)}>Cancel</button>
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        )}
      </div>

      <LoginButton myForm="reportForm" button={REPORT_TEXT.SUBMIT_CTA} />

      {userType === "Use Current Location" && <CurrentLoc key={resetKey} sendLoc={handleLoc} />}
      <Modal show={showMap} onClose={() => setShowMap(false)}>
        <LocationPicker sendLoc={handleLoc} text="Select Acccident Location" />
      </Modal>
    </form>
  );
}
