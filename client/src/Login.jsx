import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css"
import { useState } from "react";
export default function Login(){
    const [userType, setUserType] = useState("");
    return (
        
        <div className='Login' >
            <form style={{width:"50%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems :"center",gap:"20px"}} action="">
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
                <div className="form-floating loginDivs">
                    <input type='text' style={{ textAlign: "left" }} className="form-control loginInputs" id="floatingTextareaname"></input>
                    <label style={{fontSize:"12px", paddingTop:"2px"}} htmlFor="floatingTextareaname">EMAIL OR USERNAME</label>
                </div>
                <div className="form-floating loginDivs">
                    <input type='password' style={{ textAlign: "left" }} className="form-control loginInputs" id="floatingTextareapwd"></input>
                    <label style={{fontSize:"12px", paddingTop:"2px"}} htmlFor="floatingTextareapwd">PASSSWORD</label>
                </div>
                <div className="form-button loginDivs">
                    <button className="btn btn-danger loginButton" type="button">NEXT <span style={{ marginLeft: '8px' }}>➝</span>
                    </button>
                </div>
                <p>Already Have an account?<a className='text-danger' href="#">Login</a></p>
                
            </form>
        </div>
    )
}