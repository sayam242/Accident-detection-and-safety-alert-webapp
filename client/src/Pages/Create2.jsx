
import { useState } from "react";
import "../Views/Create2.css"
import CurrentLoc from "../Components/CurrentLoc"
import BackgroundImage from "../Components/BackgroundImage";
import LoginButton from "../Components/LoginButton";
import InputText from "../Components/InputText";
import LocationPicker from "../Components/LocationPicker.jsx"
import Modal from "../Components/Modal";
export default function Create2(){
    const [userType, setUserType] = useState("");
    const [showMap, setShowMap] = useState(false);
    let[AccountDetails,setAccountDetails]=useState({
        hospitalname:"",
        email:"",
        contact:null,
        location:null,
    })
     const [resetKey, setResetKey] = useState(0);

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setAccountDetails((curDetails)=>({
            ...curDetails,
            [name]:value,
        }));
    }
    const handleLoc=(e)=>{
        setAccountDetails((curDetails)=>({
            ...curDetails,
            location:e,
        }));
        setShowMap(false);
    }

    const handleSubmit=(event)=>{
        event.preventDefault;
        console.log(AccountDetails);
        setAccountDetails((curDetails)=>({
        ...curDetails,
            hospitalname:"",
            email:"",
            contact:null,
            location:null,
        }))
        setUserType("")
        setResetKey(prev => prev + 1);
    }


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
                    <InputText label="EMAIL" name="email" value={AccountDetails.email} type="text" onChange={handleChange}/>
        
                    <div className="form-floating loginDivs">
                        <input type='text' pattern="\d*" inputMode="numeric" maxLength={10} value={AccountDetails.contact || ""} style={{ textAlign: "left" }} className="form-control loginInputs no-spinner" id="floatingTextareacontact"
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
                    </div>

                    <div className="form-floating loginDivs">
                        <select
                            className="form-select loginInputs"
                            style={{textAlignLast: "left" }}
                            value={userType} onChange={locationHandler}
                            id="floatingSelect" aria-label="Floating label select example">
                            <option value="" disabled hidden>

                            </option>
                            <option value="Use Current Location">Use Current Location</option>
                            <option value="Select on Map">Select on Map</option>
                        </select>
                        <label style={{fontSize:"15px",paddingTop:"12px" }} htmlFor="floatingSelect">LOCATION</label>
                    </div>
                    
                    
                    
                    
                    <LoginButton button="SignUp" myForm="create2Form"/>
                    
                    <p>Already Have an account?<a className='text-danger' href="#">Login</a></p>
                    
                </form>
            </div>
            

        </div>
            {userType === "Use Current Location" && <CurrentLoc className="loginInputs" key={resetKey} sendLoc={handleLoc} />}
            {/* {userType === "admin" && <LocationPicker sendLoc={handleLoc} />} */}
             <Modal show={showMap} onClose={() => setShowMap(false)}>
            <LocationPicker sendLoc={handleLoc} />
            </Modal>
        </>
    )   
}