import React from "react";
import AuthPageLayout from "../components/ReportSubmissionPageLayout"; // reuse layout
import ReportForm from "../components/ReportForm";
import { useReports } from "../hooks/useReports";
import { useNavigate } from "react-router-dom";

export default function ReportSubmissionPage() {
  const { create } = useReports();
  const navigate = useNavigate();

  const handleSubmitted = async (payload) => {
    const res = await create(payload);
    if (res.success) {
      alert("Report Registered!");
      navigate("/");
    } else {
      alert(res.message || "Registration failed");
    }
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ width: "40%", height: "100%" }}>
        {/* reuse background */}
        <div style={{width:"100%",height:"100%",backgroundImage:`url("https://ik.imagekit.io/sayam242/Background_image")`,backgroundSize:"cover",backgroundPosition:"center"}} />
      </div>
      <div className='Login'>
        <ReportForm onSubmitted={handleSubmitted} />
      </div>
    </div>
  );
}
