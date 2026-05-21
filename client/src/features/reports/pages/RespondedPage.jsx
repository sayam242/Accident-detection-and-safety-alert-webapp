import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useReports } from "../hooks/useReports";
import { socket } from "../../../socket";

export default function RespondedPage() {
  const { fetchResponded, responded, loading } = useReports();

  useEffect(() => {
    fetchResponded();
  }, []);

  useEffect(() => {
    const handleFinalized = () => fetchResponded();
    socket.on("report-finalized", handleFinalized);
    return () => socket.off("report-finalized", handleFinalized);
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!responded || responded.length === 0)
    return (
      <>
        <Navbar />
        <p className="text-center mt-10">No responded reports yet</p>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h2 className="text-2xl font-bold mb-6">Responded Reports</h2>
        <div className="space-y-4">
          {responded.map((rep) => (
            <div key={rep._id} className="bg-white rounded-2xl shadow-md overflow-hidden flex items-center p-6" style={{ minHeight: "200px" }}>
              <div className="flex-1 text-left items-left pr-6">
                <p><b>Reported By:</b> {rep.name}</p>
                <p><b>Contact No:</b> {rep.contact}</p>
                <p><b>Reported Time:</b> {rep.timeDetected ? new Date(rep.timeDetected).toLocaleString() : '—'}</p>
              </div>
              <div className="flex-1 pr-6">
                <p><b>Location:</b> {rep.location?.coordinates?.join(", ") || 'N/A'}</p>
                <p><b>Severity:</b> {rep.severity}</p>
                <p><b>Responded Time:</b> {rep.timeResponded ? new Date(rep.timeResponded).toLocaleString() : '—'}</p>
              </div>
              <div className="w-52 h-36 flex-shrink-0">
                {rep.image ? (
                  <img src={rep.image} alt="Accident" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">No Image</div>
                )}
                <p className="font-bold text-lg mb-2 text-gray-800">{rep.hospitalName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
