import 'bootstrap/dist/css/bootstrap.min.css';
import "./Create1.css"
import { useState } from "react";
export default function Login(){
    const [userType, setUserType] = useState("");
    return (
        <div style={{display:"flex", width:"100%", height:"100vh"}}>
            <div style={{width:"40%",
                height:"100%",
                backgroundImage:`url("https://www.globalfleet.com/sites/default/files/field/image/shutterstock_1019141671.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",  /* Center the image */
                backgroundRepeat: "noRepeat"/* Prevent tiling */
            }}>
            </div>
        
            <div className='Login' >
                <form style={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems :"center",gap:"20px"}} action="#">
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

                    <div className="form-button loginDivs">
                        <button className="btn btn-danger loginButton" type="button">NEXT <span style={{ marginLeft: '8px' }}>➝</span>
                        </button>
                    </div>
                    <p>Already Have an account?<a className='text-danger' href="#">Login</a></p>
                    
                </form>
            </div>
        </div>
    )
}