import { useState,useEffect } from "react";


export default function CurrentLoc({  sendLoc}){

            useEffect(() => {
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
            }, [sendLoc]);
    

    
    return null;
}