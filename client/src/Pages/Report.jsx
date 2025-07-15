
import { useState } from "react";
import "../Views/Login.css"
import InputText from "../Components/InputText.jsx"
import BackgroundImage from "../Components/BackgroundImage.jsx"
import LoginButton from "../Components/LoginButton.jsx";
import CurrentLoc from "../Components/CurrentLoc.jsx"
import LocationPicker from "../Components/LocationPicker.jsx"
import Modal from "../Components/Modal.jsx";
export default function Report(){
    const [userType, setUserType] = useState("");
    const [showMap, setShowMap] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const [AccidentDetails, setAccidentDetails] = useState({
    name: "",
    contact:"",
    severity:"",
    location:null,
  });

  const handleChange=(e)=> {
    const {name,value}=e.target;
    setAccidentDetails((prev)=>({
        ...prev,
        [name]:value,
    }))
  };

  const handleSubmit = async(e) => {
  e.preventDefault();

        console.log(AccidentDetails);
    setAccidentDetails((curData)=>({
        ...curData,
        name: "",
        contact:"",
        severity:"",
        location:null,
    
    }))
};

    const handleLoc=(e)=>{
        setAccidentDetails((curDetails)=>({
            ...curDetails,
            location:e,
        }));
        setShowMap(false);
    }

        const locationHandler=(e)=>{
        const val = e.target.value;
        setUserType(val);
        if (val === "Select on Map") {
      setShowMap(true); // open modal if "Select on Map"
    }
    }
    
    return (
        <div style={{display:"flex", width:"100%", height:"100vh"}}>
            <div style={{width:"40%",
                height:"100%",
            }}>
                <BackgroundImage/>
            </div>
        
            <div className='Login' >
                <form onSubmit={handleSubmit} id="loginForm"  style={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems :"center",gap:"20px"}} action="#">
                    <h2>Report an Accident</h2>
                    
                    <InputText label="YOU NAME" value={AccidentDetails.name} name="name" type="text" onChange={handleChange}/>
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
                        <label style={{fontSize:"12px", paddingTop:"2px"}} htmlFor="floatingTextareapwd">CONTACT NUMBER</label>
                    </div>

                    <div className="form-floating loginDivs">
                        <select
                        className="form-select loginInputs"
                        style={{textAlignLast: "left" }}
                        value={AccidentDetails.severity}
                        name="severity"
                        required
                        onChange={handleChange}
                        id="floatingSelect" aria-label="Floating label select example">
                            <option value="" disabled hidden>
                                
                            </option>
                            <option value="critical">CRITICAL</option>
                            <option value="moderate">MODERATE</option>
                            <option value="low">LOW</option>
                        </select>
                        <label style={{fontSize:"15px",paddingTop:"12px" }} htmlFor="floatingSelect">ACCIDENT CONDITION</label>
                    </div>


                       <div className="form-floating loginDivs">
                        <select
                            className="form-select loginInputs"
                            style={{textAlignLast: "left" }}
                            value={userType} onChange={locationHandler}
                            required
                            id="floatingSelect" aria-label="Floating label select example">
                            
                            <option value="" disabled hidden>

                            </option>
                            <option value="Use Current Location">Use Current Location</option>
                            <option value="Select on Map">Select on Map</option>
                        </select>
                        <label style={{fontSize:"15px",paddingTop:"12px" }} htmlFor="floatingSelect">LOCATION</label>
                    </div>
                    
                    <input required className="form-control loginInputs" type="file" />

                    <LoginButton myForm="loginForm" button="Report"/>
                    
                    {userType === "Use Current Location" && <CurrentLoc className="loginInputs" key={resetKey} sendLoc={handleLoc} />}
                    {/* {userType === "admin" && <LocationPicker sendLoc={handleLoc} />} */}
                    <Modal show={showMap} onClose={() => setShowMap(false)}>
                    <LocationPicker sendLoc={handleLoc} text="Select Acccident Location" />
                    </Modal>
                    
                </form>
            </div>
        </div>
    )
}