import { useState } from "react";
import "../Views/Create2.css";

export default function CurrentLoc({  sendLoc}){
    const [userType, setUserType] = useState("");
   
   
    


    const locationHandler=(e)=>{
        setUserType(e.target.value);
        
            navigator.geolocation.getCurrentPosition(
            (position) => { 
                sendLoc({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                });
                
            },
            (err) => {
                console.error("Location error:", err);
                setUserType("")
                return alert("Please enable Location")
            }
            );
            

        } 
    

    
    return (
        
            <div className="form-floating loginDivs">
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
                <label style={{fontSize:"15px",paddingTop:"12px" }} htmlFor="floatingSelect">LOCATION</label>
            </div>
                
    )
}