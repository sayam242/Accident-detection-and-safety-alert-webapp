
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { socket } from "../socket";


import "../Views/Login.css"
import InputText from "../Components/InputText"
import BackgroundImage from "../Components/BackgroundImage"
import LoginButton from "../Components/LoginButton";

export default function Login(){
    const [formData, setFormData] = useState({
    email: "",
    password:"",
  });
  const [loading, setLoading]   = useState(false);
  const navigate                = useNavigate();

  const handleChange=(e)=> {
    const {name,value}=e.target;
    setFormData((prev)=>({
        ...prev,
        [name]:value,
    }))
  };

  const handleSubmit = async(e) => {
    setLoading(true);
  e.preventDefault();
    console.log(formData);
     try {
        const baseURL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
        const res = await axios.post( `${baseURL}/api/auth/login`,
        formData);
        const data = res.data;
        console.log("after api call")
        console.log(data);

        if (res.data?.success) {
        const { token, hospital } = res.data;
        const { _id } = hospital;
        
        console.log("id is",_id);

        localStorage.setItem("hospitalId", _id);
        if (token){
        localStorage.setItem("token", token);
        console.log("Token saved:", token);}
        localStorage.setItem("hospitalLocation", hospital.location.coordinates);
        console.log("Hospital location saved:", hospital.location.coordinates);
        console.log("Saved hospitalId:", localStorage.getItem("hospitalId"));
        alert("✅ Login successful");
        if (!socket.connected) {
          socket.connect();
        }
        // join hospital room
        socket.emit("join-hospital", hospital._id);


        navigate("/reported");
        } else {
        alert("❌ " + (res.data.message || "Login failed"));
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ " + (err.response?.data?.message || "Server error"));
    } finally {
      setLoading(false);
      // optional: clear form
      setFormData({ email: "", password: "" });
    }
  };
    
    return (
        <div style={{display:"flex", width:"100%", height:"100vh"}}>
            <div style={{width:"40%",
                height:"100%",
            }}>
                <BackgroundImage/>
            </div>
        
            <div className='Login' >
                <form onSubmit={handleSubmit} id="loginForm"  style={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems :"center",gap:"20px"}} action="#">
                    <h2>Log in to your account</h2>
                    
                    <InputText label="EMAIL" value={formData.email} name="email" type="email" onChange={handleChange}/>
                    <InputText label="PASSWORD" value={formData.password} name="password" type="password" onChange={handleChange}/>
                    <LoginButton myForm="loginForm" button="Login" disabled={loading} />
                    
                    <p>Don't Have Account? <a style={{color:"black"}} href="https://vigilant-live.vercel.app/signup">Create new</a></p>
                    
                </form>
            </div>
        </div>
    )
}