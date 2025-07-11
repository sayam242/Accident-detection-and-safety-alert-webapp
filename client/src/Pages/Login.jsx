
import { useState } from "react";
import "../Views/Login.css"
import InputText from "../Components/InputText"
import BackgroundImage from "../Components/BackgroundImage"
import LoginButton from "../Components/LoginButton";
export default function Login(){
    const [formData, setFormData] = useState({
    email: "",
    password:"",
  });

  const handleChange=(e)=> {
    const {name,value}=e.target;
    setFormData((prev)=>({
        ...prev,
        [name]:value,
    }))
  };

  const handleSubmit = async(e) => {
  e.preventDefault();
     try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (res.ok) {
            alert("✅ Hospital Found!");
        } else {
            alert("❌ " + data.message || "No such account exist");
        }
        } catch (err) {
        console.error(err);
        alert("❌ Server error");
        }

        console.log(formData);
    setFormData((curData)=>({
        ...curData,
        email: "",
        password:"",
    
    }))
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
                    <LoginButton myForm="loginForm" button="Login"/>
                    
                    <p><a style={{color:"black"}} href="#">Forgot Password</a></p>
                    
                </form>
            </div>
        </div>
    )
}