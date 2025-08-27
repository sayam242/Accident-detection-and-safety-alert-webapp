import React from 'react'
import {useNavigate} from "react-router-dom"; 
import '../Views/LandingPage.css'
import CarCrash from '../assets/CarCrash.png'
import cloud from '../assets/cloud.png'
import connection from '../assets/connection.png'
import message from '../assets/message.png'
import wifi from '../assets/wifi.png'
import sensor from '../assets/sensor.png'
import location from '../assets/location.png'   


const LandingPage = () => {
    const navigate=useNavigate();
    const handleLogin=()=>{
        navigate("/login");
    };
    const handleCreate=()=>{
        navigate("/signup");
    };
    const handleRepot=()=>{
        navigate("/report");
    };
  return (
    <div className='landing-page'>
        <div className="icon-container">
            <img src={cloud} alt="" className="icon cloud" />
            <img src={connection} alt="" className="icon connection" />
            <img src={sensor} alt="" className="icon sensor" />
            <img src={message} alt="" className="icon message" />
            <img src={wifi} alt="" className="icon wifi" />
            <img src={location} alt="" className="icon location" />

        </div>
        <h1 className='landing-title'>Accident Detection System</h1>
        <h2 className='landing-tagline'>When Accidents Happen - We're Already Responding</h2>
        <button onClick={handleRepot} className='primary-button'> Report An Accident</button>
        <div className='button-row'>
            <button onClick={handleLogin} className='login-button'>Login</button>
            <button onClick={handleCreate} className='signup-button'>Sign Up</button>
        </div>
        <div>
            <div className='carimg'>
                <img className='carcrash' src={CarCrash} alt="Car Crash" />
            </div>
            
        </div>
       
    </div>
  )
}

export default LandingPage
