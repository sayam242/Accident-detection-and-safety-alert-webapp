// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Create1 from "./Pages/Create1.jsx";
import Create2 from "./Pages/Create2.jsx";
import Login from "./Pages/Login.jsx";
import NotFound from "./Pages/NotFound.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Report from "./Pages/Report.jsx";        // public reporting
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Pages/Home.jsx";            // Reported (hospital dashboard)
import Detected from "./Pages/HomeDetected.jsx";
import Responded from "./Pages/Responded.jsx"; // Responded (hospital dashboard)

export default function App() {
  useEffect(() => {
    // Only for development: force a clean slate at each reload
    // Remove in production if you want persistent sessions
    const fromLogin = sessionStorage.getItem("justLoggedIn");
    if (!fromLogin) {
      localStorage.removeItem("token");
      // clear any legacy storages you might have used
      sessionStorage.removeItem("token");
      document.cookie = "token=; Max-Age=0; path=/";
    }
    sessionStorage.removeItem("justLoggedIn");
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-step1" element={<Create1 />} />
        <Route path="/signup" element={<Create2 />} />

        {/* Public: citizen report */}
        <Route path="/report" element={<Report />} />

        {/* Protected: hospital-only */}
        <Route
          path="/reported"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/responded"
          element={
            <Responded/>
            // <ProtectedRoute>
            //   <Responded />
            // </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
