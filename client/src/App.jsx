
import './App.css'
import CreateAccount from "./CreateAccount.jsx"
import Login from "./Login.jsx";

function App() {

  return (
    
      <div style={{width:"100%"}}>
        <div style={{display:"flex", width:"100%", height:"100vh"}}>
          <div style={{width:"40%",
            height:"100%",
            backgroundImage:`url("https://www.globalfleet.com/sites/default/files/field/image/shutterstock_1019141671.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",  /* Center the image */
            backgroundRepeat: "noRepeat"/* Prevent tiling */
          }}>
          </div>
          <div style={{display:"flex",justifyContent:"center", width:"60%", height:"100%", padding:"0%", margin:"0%"}}>
          <Login/>
          </div>
        </div>
      </div>

  )
}

export default App
