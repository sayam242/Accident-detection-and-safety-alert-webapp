// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import SignUp from "./Pages/SignUp.jsx";
import Login from "./Pages/Login.jsx";
import NotFound from "./Pages/NotFound.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Report from "./Pages/Report.jsx";        // public reporting
import ProtectedRoute from "./Components/ProtectedRoute";
import Reported from "./Pages/Reported.jsx";            // Reported (hospital dashboard)
import Responded from "./Pages/Responded.jsx"; // Responded (hospital dashboard)\
import ManageAmbulances from "./Pages/ManageAmbulances.jsx";
import { socket } from "./socket";


export default function App() {
  useEffect(() => {
    socket.on("connect", () => {
      
    });

    socket.on("disconnect", () => {
      
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Public: citizen report */}
        <Route path="/report" element={<Report />} />

        {/* Protected: hospital-only */}
        <Route
          path="/reported"
          element={
            <ProtectedRoute>
              <Reported />
            </ProtectedRoute>
          }
        />
        <Route
          path="/responded"
          element={
           
            <ProtectedRoute>
              <Responded />
             </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
        <Route path="/ambulances" element={<ManageAmbulances />} />

      </Routes>
    </Router>
  );
}
