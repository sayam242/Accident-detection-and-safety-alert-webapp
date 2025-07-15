import React from 'react'
import {useNavigate} from "react-router-dom"; 
import '../Views/LandingPage.css'
import CarCrash from '../Assets/CarCrash.png'
import cloud from '../Assets/cloud.png'
import connection from '../Assets/connection.png'
import message from '../Assets/message.png'
import wifi from '../Assets/wifi.png'
import sensor from '../Assets/sensor.png'
import location from '../Assets/location.png'   


const LandingPage = () => {
    const navigate=useNavigate();
    const handleLogin=()=>{
        navigate("/login");
    };
    const handleCreate=()=>{
        navigate("/create2");
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
