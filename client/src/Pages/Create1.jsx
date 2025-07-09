import 'bootstrap/dist/css/bootstrap.min.css';
import "../Views/Create1.css"
import LoginButton from '../Components/LoginButton';
import BackgroundImage from '../Components/BackgroundImage';
import { useState } from "react";
export default function Login(){
    const [userType, setUserType] = useState("");

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userType);
        setUserType("")
    };
    return (
        <div style={{display:"flex", width:"100%", height:"100vh"}}>
            <div style={{width:"40%",
                height:"100%",
            }}>
                <BackgroundImage/>
            </div>
        
            <div className='Login' >
                <form onSubmit={handleSubmit} id='create1Form' style={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems :"center",gap:"20px"}} action="#">
                    <h2>Create your account</h2>
                    <div className="form-floating loginDivs">
                        <select
                        className="form-select loginInputs"
                        style={{textAlignLast: "left" }}
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        id="floatingSelect" aria-label="Floating label select example">
                            <option value="" disabled hidden>
                                
                            </option>
                            <option value="hospital">HOSPITAL</option>
                            <option value="admin">ADMIN</option>
                        </select>
                        <label style={{fontSize:"15px",paddingTop:"12px" }} htmlFor="floatingSelect">USER TYPE</label>
                    </div>

                    <LoginButton myForm="create1Form" button="Next"/>
                    <p>Already Have an account?<a className='text-danger' href="#">Login</a></p>
                    
                </form>
            </div>
        </div>
    )
}