
import './App.css'
import Create1 from "./Pages/Create1.jsx";
import Create2 from "./Pages/Create2.jsx";
import Login from "./Pages/Login.jsx";
import CurrentLoc from './Components/CurrentLoc.jsx';
import InputText from './Components/InputText.jsx';
import {Routes,Route} from "react-router-dom";



function App() {

  return (
    
      <>
      <Routes>
      {/* <Route path='/' element={<Home/>} /> */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Create2/>}/>
      </Routes>
      </>
        
          
      

  )
}

export default App
