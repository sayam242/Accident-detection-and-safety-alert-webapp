
import { useState } from "react";
import "../Views/Login.css"
import InputText from "../Components/InputText"
import BackgroundImage from "../Components/BackgroundImage"
import LoginButton from "../Components/LoginButton";
export default function Login(){
    const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange=(e)=> {
    const {name,value}=e.target;
    setFormData((prev)=>({
        ...prev,
        [name]:value,
    }))
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);
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
                    
                    <InputText label="EMAIL OR USERNAME" value={FormData.email} name="email" type="text" onChange={handleChange}/>
                    <InputText label="PASSWORD" value={FormData.password} name="passsword" type="password" onChange={handleChange}/>
                    <LoginButton myForm="loginForm" button="Login"/>
                    
                    <p><a style={{color:"black"}} href="#">Forgot Password</a></p>
                    
                </form>
            </div>
        </div>
    )
}