import { useEffect, useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
const severityColors = {
  Critical: "bg-red-100 text-red-600 border-red-300",
  Moderate: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Low: "bg-green-100 text-green-700 border-green-300",
};


export default function Responded() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const didRun = useRef(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const fetchResponded = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please login as hospital");
          navigate("/login", { replace: true });
          return;
        }

        const res = await fetch(`${backend_URL}/api/responded/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (data.success) {
          setReports(data.data);
        } else {
          alert(data.message || "Failed to load responded reports");
        }
      } catch (err) {
        console.error("Error fetching responded reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResponded();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (reports.length === 0) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-10">No responded reports yet</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6">
        <h2 className="text-2xl font-bold mb-6">Responded Reports</h2>

        <div className="space-y-4">
          {reports.map((rep) => (
            <div
              key={rep._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex items-center p-6"
              style={{ minHeight: "200px" }} // equal row height
            >
              {/* Column 1 (Hospital + Reporter info) */}
              <div className="flex-1 text-left items-left pr-6">
                
                <p><b>Reported By:</b> {rep.name}</p>
                <p><b>Contact No:</b> {rep.contact}</p>
                <p>
                  <b>Reported Time:</b>{" "}
                  {new Date(rep.timeDetected || rep.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Column 2 (Accident info) */}
              <div className="flex-1 pr-6">
                <p>
                  <b>Location:</b>{" "}
                  {rep.location?.coordinates?.join(", ") || "N/A"}
                </p>
                <p>
                  <b>Severity:</b>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-full border text-xs font-semibold ${
                      severityColors[rep.severity] || severityColors.Moderate
                    }`}
                  >
                    {rep.severity}
                  </span>
                </p>
                <p>
                  <b>Responded Time:</b>{" "}
                  {new Date(rep.timeResponded).toLocaleString()}
                </p>
              </div>

              {/* Column 3 (Image) */}
              <div className="w-52 h-36 flex-shrink-0">
                {rep.image ? (
                  <img
                    src={rep.image}
                    alt="Accident"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                    No Image
                  </div>

                )}
                <p className="font-bold text-lg mb-2 text-gray-800">
                  {rep.hospitalName}
              </p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
