import { useState } from "react";
import "./Create2.css";

export default function CurrentLoc(){
    const [userType, setUserType] = useState("");
    let [location,setLocation]=useState(null);
    const [err,setErr]=useState("");


    const locationHandler=(e)=>{
        setUserType(e.target.value);
        if(e.target.value=="Use Current Location"){
            navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                });
                
            },
            (err) => {
                console.error("Location error:", err);
                setErr("Failed to get location. Please allow location access.");
            }
            );
            sendLoc(location);
            sendErr(err);

        } 
    }

    
    return (
        
            
                <select
                    className="form-select loginInputs"
                    style={{textAlignLast: "left" }}
                    value={userType} onChange={locationHandler}
                    id="floatingSelect" aria-label="Floating label select example">
                    <option value="" disabled hidden>

                    </option>
                    <option value="hospital">Use Current Location</option>
                    {/* <option value="admin">Seleect on Map</option> */}
                </select>
                
    )
}