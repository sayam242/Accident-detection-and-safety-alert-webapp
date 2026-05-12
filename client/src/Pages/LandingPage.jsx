import React from 'react'
import {useNavigate} from "react-router-dom"; 
import '../Views/LandingPage.css'
import CarCrash from '../assets/landing_page/CarCrash.png'
import cloud from '../assets/landing_page/cloud.png'
import connection from '../assets/landing_page/connection.png'
import message from '../assets/landing_page/message.png'
import wifi from '../assets/landing_page/wifi.png'
import sensor from '../assets/landing_page/sensor.png'
import location from '../assets/landing_page/location.png'   


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
