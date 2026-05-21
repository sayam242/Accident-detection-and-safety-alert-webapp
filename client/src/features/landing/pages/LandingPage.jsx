import React from 'react';
import {useNavigate} from "react-router-dom"; 
import '../../../Views/LandingPage.css';
import CarCrash from '../../../assets/landing_page/CarCrash.png';
import cloud from '../../../assets/landing_page/cloud.png';
import connection from '../../../assets/landing_page/connection.png';
import message from '../../../assets/landing_page/message.png';
import wifi from '../../../assets/landing_page/wifi.png';
import sensor from '../../../assets/landing_page/sensor.png';
import location from '../../../assets/landing_page/location.png';   
import { LANDING_TEXT } from '../../landing/constants/landingConstants';

export default function LandingPage() {
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
        <h1 className='landing-title'>{LANDING_TEXT.TITLE}</h1>
        <h2 className='landing-tagline'>{LANDING_TEXT.TAGLINE}</h2>
        <button onClick={handleRepot} className='primary-button'>{LANDING_TEXT.REPORT_CTA}</button>
        <div className='button-row'>
            <button onClick={handleLogin} className='login-button'>{LANDING_TEXT.LOGIN_CTA}</button>
            <button onClick={handleCreate} className='signup-button'>{LANDING_TEXT.SIGNUP_CTA}</button>
        </div>
        <div>
            <div className='carimg'>
                <img className='carcrash' src={CarCrash} alt="Car Crash" />
            </div>
            
        </div>
       
    </div>
  );
}
