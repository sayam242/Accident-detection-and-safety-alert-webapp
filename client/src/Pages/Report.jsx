import { useState, useRef } from "react";
import "../Views/Login.css"
import InputText from "../Components/InputText.jsx"
import BackgroundImage from "../Components/BackgroundImage.jsx"
import LoginButton from "../Components/LoginButton.jsx";
import CurrentLoc from "../Components/CurrentLoc.jsx"
import LocationPicker from "../Components/LocationPicker.jsx"
import Modal from "../Components/Modal.jsx";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Report() {
    const [userType, setUserType] = useState("");
    const [showMap, setShowMap] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const [AccidentDetails, setAccidentDetails] = useState({
        name: "",
        contact: "",
        severity: "",
        location: null,
        image: null, // Add image to state
    });
    const [showCamera, setShowCamera] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccidentDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can now send AccidentDetails.image (base64 or blob) to your backend

         if (!AccidentDetails.location) {
                alert("Please select a location on the map.");
                return;
            }
            try {
                const res = await axios.post( `${backend_URL}/api/reports/creat`,
                AccidentDetails);

                const data = res.data;

            if (res.status === 201 || res.status === 200) {
                alert("Report Registered!");
                navigate("/"); 
            } else {
                alert( data.message || "Registration failed");
            }
            }catch (err) {
                console.error("Registration error:", err);

                // Try to get backend error message safely
                const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
                alert(errorMsg);
            }
        console.log(AccidentDetails);
        setAccidentDetails((curData) => ({
            ...curData,
            name: "",
            contact: "",
            severity: "",
            location: null,
            image: null,
        }))
        setUserType("");
        setCapturedImage(null);
    };

     const handleLoc = (coords) => {
        // if lat/lng structure received, convert to GeoJSON
        const location = coords.lat !== undefined && coords.lng !== undefined
            ? {
                type: "Point",
                coordinates: [coords.lng, coords.lat], // longitude first
            }
            : coords; // already in correct format

        setAccidentDetails((curDetails) => ({
            ...curDetails,
            location,
        }));

        setShowMap(false);
    };



    const locationHandler = (e) => {
        const val = e.target.value;
        setUserType(val);
        if (val === "Select on Map") {
            setShowMap(true); // open modal if "Select on Map"
        }
    }

    // Camera functions
    const openCamera = async () => {
        setShowCamera(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
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
            setAccidentDetails((prev) => ({
                ...prev,
                image: dataUrl,
            }));
            // Stop the camera
            const stream = video.srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            setShowCamera(false);
        }
    };

    const closeCamera = () => {
        setShowCamera(false);
        const video = videoRef.current;
        if (video && video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }
    };

    const removePhoto = () => {
        setCapturedImage(null);
        setAccidentDetails((prev) => ({
            ...prev,
            image: null,
        }));
    };


    const [otpSent, setOtpSent] = useState(false);
const [otp, setOtp] = useState('');
const [otpVerified, setOtpVerified] = useState(false);

const sendOtp = async () => {
    if (!AccidentDetails.contact || AccidentDetails.contact.length < 10) {
  alert("Please enter a valid phone number");
  return;
}

  const response = await fetch(`${backend_URL}/api/otp/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: AccidentDetails.contact })
  });
  const data = await response.json();
  if (data.success) setOtpSent(true);
};

const verifyOtp = async () => {
  const response = await fetch(`${backend_URL}/api/otp/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: AccidentDetails.contact, otp })
  });
  const data = await response.json();
  setOtpVerified(data.verified);
};
    return (
        <div style={{ display: "flex", width: "100%", height: "100vh" }}>
            <div style={{ width: "40%", height: "100%" }}>
                <BackgroundImage />
            </div>
            <div className='Login'>
                <form onSubmit={handleSubmit} id="loginForm" style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px" }} action="#">
                    <h2>Report an Accident</h2>
                    <InputText label="YOUR NAME" value={AccidentDetails.name} name="name" type="text" onChange={handleChange} />
                    <div className="form-floating loginDivs">
                        <input type='text' required pattern="\d*" inputMode="numeric" maxLength={10} minLength={10} value={AccidentDetails.contact || ""} style={{ textAlign: "left" }} className="form-control loginInputs no-spinner" id="floatingTextareacontact"
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setAccidentDetails((curDetails) => ({
                                        ...curDetails,
                                        contact: value,
                                    }));
                                }
                            }}></input>
                        <label style={{ fontSize: "12px", paddingTop: "2px" }} htmlFor="floatingTextareapwd">CONTACT NUMBER</label>
                        {AccidentDetails.contact && (
                            <>
                                {!otpSent && (
                                    <button type="button" onClick={sendOtp} disabled={otpSent}>Send OTP</button>
                                )}
                                {otpSent && (
                                    <div>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={e => setOtp(e.target.value)}
                                            placeholder="Enter OTP"
                                        />
                                        <button type="button" onClick={verifyOtp}>Verify OTP</button>
                                        {otpVerified && <span style={{ color: 'green' }}>Verified!</span>}
                                        {!otpVerified && otp && <span style={{ color: 'red' }}>Invalid OTP</span>}
                                    </div>
                                )}
                            </>
                        )}
                                </div>
                    <div className="form-floating loginDivs">
                        <select
                            className="form-select loginInputs"
                            style={{ textAlignLast: "left" }}
                            value={AccidentDetails.severity}
                            name="severity"
                            required
                            onChange={handleChange}
                            id="floatingSelect" aria-label="Floating label select example">
                            <option value="" disabled hidden></option>
                            <option value="critical">CRITICAL</option>
                            <option value="moderate">MODERATE</option>
                            <option value="low">LOW</option>
                        </select>
                        <label style={{ fontSize: "15px", paddingTop: "12px" }} htmlFor="floatingSelect">ACCIDENT CONDITION</label>
                    </div>
                    <div className="form-floating loginDivs">
                        <select
                            className="form-select loginInputs"
                            style={{ textAlignLast: "left" }}
                            value={userType} onChange={locationHandler}
                            required
                            id="floatingSelect" aria-label="Floating label select example">
                            <option value="" disabled hidden></option>
                            <option value="Use Current Location">Use Current Location</option>
                            <option value="Select on Map">Select on Map</option>
                        </select>
                        <label style={{ fontSize: "15px", paddingTop: "12px" }} htmlFor="floatingSelect">LOCATION</label>
                    </div>

                    {/* Camera Section */}
                    <div style={{ width: "100%", textAlign: "center" }}>
                        {!capturedImage && (
                            <button type="button" className="btn btn-secondary" onClick={openCamera}>
                                Click Photo
                            </button>
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
                                <button type="button" className="btn btn-secondary" onClick={closeCamera}>Cancel</button>
                                <canvas ref={canvasRef} style={{ display: "none" }} />
                            </div>
                        )}
                    </div>

                    <LoginButton myForm="loginForm" button="Report" />

                    {userType === "Use Current Location" && <CurrentLoc className="loginInputs" key={resetKey} sendLoc={handleLoc} />}
                    <Modal show={showMap} onClose={() => setShowMap(false)}>
                        <LocationPicker sendLoc={handleLoc} text="Select Acccident Location" />
                    </Modal>
                </form>
            </div>
        </div>
    )}
