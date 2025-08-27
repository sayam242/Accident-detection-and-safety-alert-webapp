import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import wifi_icon_w from '../assets/dashboard/Wi-Fi white.png'
import wifi_icon_g from '../assets/dashboard/Wi-Fi grey.png'
import phone_g from '../assets/dashboard/Smartphone grey.png'
import phone_w from '../assets/dashboard/Smartphone white.png'
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate=useNavigate()
    const [active, setActive] = useState("");
    const base =
    "flex items-center space-x-2 px-4 py-1 rounded-full font-semibold transition";

    useEffect(() => {
    if (location.pathname.includes("responded")) {
      setActive("responded");
    } else if (location.pathname.includes("reported")) {
      setActive("reported");
    }
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hospitalId");
    navigate("/login");
  };

    return (
       <nav className="bg-white shadow px-6 py-3 flex items-center justify-between">
  
  <div className="flex items-center space-x-2">
    <span className="w-3 h-3 bg-red-600 rounded-full"></span>
    <span className="text-2xl font-bold text-gray-800 tracking-wide">ADRS</span>
  </div>

  <div className="p-1 flex bg-gray-500 rounded-full  items-center">
    <div className={
          base +
          (active === "responded"? " bg-white text-gray-500":" bg-transparent text-white/70")
        }
        style={{ cursor: "pointer" }}
        onClick={() => {
          setActive("responded");
          navigate("/responded");
        }}>
          <img className='h-5 w-5' src={active === 'responded' ? wifi_icon_g : wifi_icon_w}alt="" />
          <button className="px-2 py-1">Responded</button>
    </div>
    <div 
    className={
          base +
          (active === "reported" ? " bg-white text-gray-500" : " bg-transparent text-white/70")
        }
        style={{ cursor: "pointer" }}
         onClick={() => {
          setActive("reported");
          navigate("/reported");
        }}>
          <img className='h-5 w-5' src={active === 'reported' ? phone_g : phone_w} alt="" />
          <button  className="px-2 py-1">Reported</button></div>
  </div>

  <button onClick={logout}>Logout</button>

</nav>

    );
}

export default Navbar;