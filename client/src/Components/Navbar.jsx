import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import notification_icon from '../assets/dashboard/Notification.png'
import setting_icon from '../assets/dashboard/Settings.png'
import profile_icon from '../assets/dashboard/Profile.png'
import wifi_icon_w from '../assets/dashboard/Wi-Fi white.png'
import wifi_icon_g from '../assets/dashboard/Wi-Fi grey.png'
import phone_g from '../assets/dashboard/Smartphone grey.png'
import phone_w from '../assets/dashboard/Smartphone white.png'
import { useNavigate } from 'react-router-dom';
import Notifications from './Notifications';


function Navbar() {
    const navigate=useNavigate()
    const [active, setActive] = useState("");
    const base =
    "flex items-center space-x-2 px-4 py-1 rounded-full font-semibold transition";

    useEffect(() => {
    if (location.pathname.includes("detected")) {
      setActive("detected");
    } else if (location.pathname.includes("reported")) {
      setActive("reported");
    }
  }, [location.pathname]);
    return (
       <nav className="bg-white shadow px-6 py-3 flex items-center justify-between">
  
  <div className="flex items-center space-x-2">
    <span className="w-3 h-3 bg-red-600 rounded-full"></span>
    <span className="text-2xl font-bold text-gray-800 tracking-wide">VIGILANT</span>
  </div>

  <div className="p-1 flex bg-gray-500 rounded-full  items-center">
    <div className={
          base +
          (active === "detected"? " bg-white text-gray-500":" bg-transparent text-white/70")
        }><img className='h-5 w-5' src={active === 'detected' ? wifi_icon_g : wifi_icon_w}alt="" /><button onClick={() => {
          setActive("detected");
          navigate("/detected");
        }} className="px-2 py-1">Detected</button></div>
    <div 
    className={
          base +
          (active === "reported" ? " bg-white text-gray-500" : " bg-transparent text-white/70")
        }><img className='h-5 w-5' src={active === 'reported' ? phone_g : phone_w} alt="" /><button  onClick={() => {
          setActive("reported");
          navigate("/reported");
        }} className="px-2 py-1">Reported</button></div>
  </div>

  
  <div className="flex items-center space-x-4">
    {/* <img src={notification_icon} alt="bell" className="h-7 w-7" /> */}
    {/* <img src={setting_icon} alt="settings" className="h-5 w-5" />
    <img src={profile_icon} alt="user" className="h-8 w-8 rounded-full" /> */}
    <Notifications/>
  </div>
</nav>

    );
}

export default Navbar;