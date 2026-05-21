import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../features/landing/pages/LandingPage";
import LoginPage from "../features/auth/pages/LoginPage";
import SignUpPage from "../features/auth/pages/SignUpPage";
import NotFound from "../features/common/pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { ReportSubmissionPage, ReportedDashboardPage, RespondedPage } from "../features/reports/pages";
import ManageAmbulancesPage from "../features/ambulances/pages/ManageAmbulancesPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/report" element={<ReportSubmissionPage />} />

        <Route
          path="/reported"
          element={
            <ProtectedRoute>
              <ReportedDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/responded"
          element={
            <ProtectedRoute>
              <RespondedPage />
            </ProtectedRoute>
          }
        />

        <Route path="/ambulances" element={<ManageAmbulancesPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}