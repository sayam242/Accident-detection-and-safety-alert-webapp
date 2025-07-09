export default function InputText({label, name, value, onChange, type}){
return(
    
        <div className="form-floating loginDivs">
                <input name={name} value={value} onChange={onChange} type={type} style={{ textAlign: "left" }} className="form-control loginInputs" ></input>
                <label style={{fontSize:"12px", paddingTop:"2px"}} htmlFor="floatingTextareaname">{label}</label>
        </div>
    
)
}