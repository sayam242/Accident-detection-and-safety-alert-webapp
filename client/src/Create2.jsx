
import "./Create2.css"
export default function Create2(){
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
                        <input type='text' style={{ textAlign: "left" }} className="form-control loginInputs" id="floatingTextareaname"></input>
                        <label style={{fontSize:"12px", paddingTop:"2px"}} htmlFor="floatingTextareaname">HOSPITAL NAME</label>
                    </div>
                    <div className="form-floating loginDivs">
                        <input type='text' style={{ textAlign: "left" }} className="form-control loginInputs" id="floatingTextareaname"></input>
                        <label style={{fontSize:"12px", paddingTop:"2px"}} htmlFor="floatingTextareaname">LOCATION</label>
                    </div>
                    <div className="form-floating loginDivs">
                        <input type='text' pattern="\d*" inputMode="numeric" maxLength={10} style={{ textAlign: "left" }} className="form-control loginInputs no-spinner" id="floatingTextareapwd"></input>
                        <label style={{fontSize:"12px", paddingTop:"2px"}} htmlFor="floatingTextareapwd">CONTACT NUMBER</label>
                    </div>
                    <div className="form-button loginDivs">
                        <button className="btn btn-danger loginButton" type="button">SignUp
                        </button>
                    </div>
                    <p>Already Have an account?<a className='text-danger' href="#">Login</a></p>
                    
                </form>
            </div>
        </div>
    )
}