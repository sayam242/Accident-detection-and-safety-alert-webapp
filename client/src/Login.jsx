
import "./Login.css"
export default function Login(){
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
                    <h2>Log in to your account</h2>
                    
                    <div className="form-floating loginDivs">
                        <input type='text' style={{ textAlign: "left" }} className="form-control loginInputs" id="floatingTextareaname"></input>
                        <label style={{fontSize:"12px", paddingTop:"2px"}} htmlFor="floatingTextareaname">EMAIL OR USERNAME</label>
                    </div>
                    <div className="form-floating loginDivs">
                        <input type='text' style={{ textAlign: "left" }} className="form-control loginInputs" id="floatingTextareaname"></input>
                        <label style={{fontSize:"12px", paddingTop:"2px"}} htmlFor="floatingTextareaname">PASSWORD</label>
                    </div>
                    <div className="form-button loginDivs">
                        <button className="btn btn-danger loginButton" type="button">Log In
                        </button>
                    </div>
                    <p><a style={{color:"black"}} href="#">Forgot Password</a></p>
                    
                </form>
            </div>
        </div>
    )
}