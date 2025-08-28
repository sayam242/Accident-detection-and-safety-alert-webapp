
import { useState } from "react";
import "../Views/Create2.css"
import CurrentLoc from "../Components/CurrentLoc"
import BackgroundImage from "../Components/BackgroundImage";
import LoginButton from "../Components/LoginButton";
import InputText from "../Components/InputText";
import LocationPicker from "../Components/LocationPicker.jsx"
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";
import axios from "axios";

export default function Create2(){
    const navigate = useNavigate();
    const [userType, setUserType] = useState("");
    const [showMap, setShowMap] = useState(false);
    let[AccountDetails,setAccountDetails]=useState({
        hospitalname:"",
        email:"",
        password:"",
        location:null,
    })
     const [resetKey, setResetKey] = useState(0);


    // Function to handel Submit....

        const handleSubmit= async(event)=>{
        event.preventDefault();
            if (!AccountDetails.location) {
                alert("Please select a location on the map.");
                return;
            }
            try {
                const res = await axios.post( `${backend_URL}/api/auth/create2`,
                AccountDetails);

                const data = res.data;

            if (res.status === 201 || res.status === 200) {
                alert("Hospital Registered!");
                navigate("/login"); 
            } else {
                alert( data.message || "Registration failed");
            }
            }catch (err) {
                console.error("Registration error:", err);

                // Try to get backend error message safely
                const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
                alert(errorMsg);
            }

        console.log(AccountDetails);
        setAccountDetails((curDetails)=>({
        ...curDetails,
            hospitalname:"",
            email:"",
            password:"",
            location:null,
        }))
        setUserType("")
        setResetKey(prev => prev + 1);

    }


    // Function to handle input changes i.e Hospital name, Email, Password.....

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setAccountDetails((curDetails)=>({
            ...curDetails,
            [name]:value,
        }));
    }


    // Function to handle location selection from map or current Location...

    const handleLoc = (coords) => {
        // if lat/lng structure received, convert to GeoJSON
        const location = coords.lat !== undefined && coords.lng !== undefined
            ? {
                type: "Point",
                coordinates: [coords.lng, coords.lat], // longitude first
            }
            : coords; // already in correct format

        setAccountDetails((curDetails) => ({
            ...curDetails,
            location,
        }));

        setShowMap(false);
    };



    // used for location selection dropdown...

    const locationHandler=(e)=>{
        const val = e.target.value;
        setUserType(val);
        if (val === "Select on Map") {
      setShowMap(true); // open modal if "Select on Map"
    }
    }

   
    return (
        <>
        <div style={{display:"flex", width:"100%", height:"100vh"}}>
            <div style={{width:"40%",
                height:"100%",
            }}>
                <BackgroundImage/>
            </div>
        
            <div className='Login' >
                <form onSubmit={handleSubmit} id="create2Form" style={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems :"center",gap:"20px"}} action="#">
                    <h2>Create your account</h2>
                    
                    <InputText label="HOSPITAL NAME" name="hospitalname" value={AccountDetails.hospitalname} type="text" onChange={handleChange}/>
                    <InputText label="EMAIL" name="email" value={AccountDetails.email} type="email" onChange={handleChange}/>
                    <InputText label="PASSWORD" value={AccountDetails.password} name="password" type="password" onChange={handleChange}/>
                    

                    {/* if wish to get Phone No of hospital also as input ....  */}

                    {/* <div className="form-floating loginDivs">
                        <input type='text' required pattern="\d*" inputMode="numeric" maxLength={10} minLength={10} value={AccountDetails.contact || ""} style={{ textAlign: "left" }} className="form-control loginInputs no-spinner" id="floatingTextareacontact"
                        onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                        setAccountDetails((curDetails) => ({
                            ...curDetails,
                            contact: value,
                        }));
                        }
                    }}></input>
                        <label style={{fontSize:"12px", paddingTop:"2px"}} htmlFor="floatingTextareapwd">CONTACT NUMBER</label>
                    </div> */}

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
                    
                    
                    
                    
                    <LoginButton button="SignUp" myForm="create2Form"/>
                    
                    <p>Already Have an account?<a className='text-danger' href="https://vigilant-live.vercel.app/login">Login</a></p>
                    
                </form>
            </div>
            

        </div>
            {userType === "Use Current Location" && <CurrentLoc className="loginInputs" key={resetKey} sendLoc={handleLoc} />}

             <Modal show={showMap} onClose={() => setShowMap(false)}>
            <LocationPicker sendLoc={handleLoc} text="Select Hospital Location" />
            </Modal>
        </>
    )   
}