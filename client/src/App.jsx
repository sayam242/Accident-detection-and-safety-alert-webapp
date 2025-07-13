
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Create1 from "./Pages/Create1.jsx";
import Create2 from "./Pages/Create2.jsx";
import Login from "./Pages/Login.jsx";
import NotFound from './Pages/NotFound.jsx';
<<<<<<< HEAD
import LandingPage from './Pages/LandingPage.jsx';
import Report from './Pages/Report.jsx';
=======
import Home from './Pages/Home.jsx';
import Detected from './Pages/HomeDetected.jsx';
>>>>>>> e262557e99066e2790fc919dd9ae5111e6e09efb



function App() {

  return (
    
      <Router>
        <Routes>
<<<<<<< HEAD
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/report' element={<Report/>}/>
=======
          <Route path='/' element={<Home/>}/>
          <Route path='/detected' element={<Detected/>}/>
>>>>>>> e262557e99066e2790fc919dd9ae5111e6e09efb
          <Route path='/login' element={<Login/>}/>
          <Route path='/create1' element={<Create1/>}/>
          <Route path='create2'element={<Create2/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>

  )
}

export default App
