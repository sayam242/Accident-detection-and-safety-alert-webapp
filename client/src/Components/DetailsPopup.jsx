import React, { useEffect, useState, useMemo } from "react";
import MapPopup from "./MapPopup";
import { socket } from "../socket";
import RespondModal from "./RespondModal";

export default function DetailsPopup({ open, onClose, accident, hospiloc }) {
  if (!open || !accident) return null;

  const [responses, setResponses] = useState([]);
  const [respondOpen, setRespondOpen] = useState(false);
  const [ambulances, setAmbulances] = useState([]);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    forceUpdate((n) => n + 1); // triggers re-render every minute
  }, 60 * 1000); // every 1 minute

  return () => clearInterval(interval);
}, []);



  useEffect(() => {
  if (!open || !accident?._id) return;

  const fetchResponses = async () => {
    const baseURL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${baseURL}/api/responses/${accident._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (data.success) {
      setResponses(data.responses);
    }
  };

  fetchResponses();
}, [open, accident?._id]);

  /* ---------------- SOCKET: LIVE RESPONSES ---------------- */


  useEffect(() => {
    if (!open || !accident?._id) return;

    socket.emit("join-accident", accident._id);

    const handleNewResponse = (data) => {
      if (data?.accidentId === accident._id) {
        setResponses((prev) => [...prev, data.response]);
      }
    };

    socket.on("new-response", handleNewResponse);

    return () => {
      socket.off("new-response", handleNewResponse);
    };
  }, [open, accident?._id]);



  useEffect(() => {
  if (!open) return;

  const fetchAmbulances = async () => {
    const baseURL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseURL}/api/ambulances`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    // ✅ only available ambulances
    setAmbulances(
      data.ambulances.filter((a) => a.status === "available")
    );
  };

  fetchAmbulances();
}, [open]);

  /* ---------------- SORT & FASTEST LOGIC ---------------- */
  const sortedResponses = useMemo(() => {
    return [...responses].sort(
      (a, b) => a.estimatedTimeToReach - b.estimatedTimeToReach
    );
  }, [responses]);

  const fastestETA =
    sortedResponses.length > 0
      ? sortedResponses[0].estimatedTimeToReach
      : null;

  /* ---------------- RESPOND HANDLERS ---------------- */
  const handleRespond = () => {
    setRespondOpen(true);
  };

 const handleSubmitResponse = async (data) => {
  try {
    const baseURL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseURL}/api/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        accident: accident._id,
        ambulance: data.ambulanceId,
        estimatedTimeToReach: data.estimatedTimeToReach,
      }),
    });

    const result = await res.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    setRespondOpen(false);
  } catch (err) {
    console.error(err);
    alert("Failed to submit response");
  }
};


const getRemainingETA = (response) => {
  const now = Date.now();
  const respondedAt = new Date(response.createdAt).getTime();

  const elapsedMinutes = (now - respondedAt) / (1000 * 60);
  const remaining = Math.ceil(
    response.estimatedTimeToReach - elapsedMinutes
  );

  return remaining > 0 ? remaining : 0;
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-3xl p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        {/* Map */}
        <div className="mb-6">
          {accident.location?.coordinates && (
            <MapPopup
              coords={accident.location.coordinates}
              hospiloc={hospiloc}
            />
          )}
        </div>

        {/* Accident Info */}
        <div className="grid grid-cols-4 text-center gap-4 mb-6">
          <div>
            <div className="font-semibold">Location</div>
            <div className="text-sm">
              {accident.location.coordinates.join(", ")}
            </div>
          </div>
          <div>
            <div className="font-semibold">Time</div>
            <div className="text-sm">
              {accident.timeDetected
                ? new Date(accident.timeDetected).toLocaleString()
                : "—"}
            </div>
          </div>
          <div>
            <div className="font-semibold">Severity</div>
            <div className="text-red-600 font-bold">
              {accident.severity}
            </div>
          </div>
          <div>
            <div className="font-semibold">Distance</div>
            <div className="text-sm">
              {accident.distanceKm ?? "?"} km
            </div>
          </div>
        </div>

        {/* Reporter */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
          <p><b>Reported By:</b> {accident.name}</p>
          <p><b>Contact:</b> {accident.contact}</p>
          <p>
            <b>Source:</b>{" "}
            {accident.reportedBy === "device" ? "Device" : "Web App"}
          </p>
        </div>

        {/* ---------------- LIVE RESPONSE LIST ---------------- */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-lg">
            Hospital Responses (Live)
          </h3>

          {sortedResponses.length === 0 ? (
            <div className="text-sm text-gray-500 italic">
              No hospital has responded yet
            </div>
          ) : (
            <div className="space-y-2">
              {sortedResponses.map((res, idx) => {
                const isFastest =
                  res.estimatedTimeToReach === fastestETA;

                return (
                  <div
                    key={idx}
                    className={`flex justify-between items-center border rounded-lg px-4 py-2 ${
                      isFastest
                        ? "bg-green-50 border-green-400"
                        : "bg-gray-50"
                    }`}
                  >
                    <div>
                      <div className="font-semibold">
                        {res.hospitalName}
                      </div>
                      <div className="text-xs text-gray-500">
                        ETA: {getRemainingETA(res)} min
                      </div>
                    </div>

                    {isFastest ? (
                      <span className="text-xs font-bold text-green-700 bg-green-200 px-3 py-1 rounded-full">
                        FASTEST
                      </span>
                    ) : (
                      <span className="text-xs text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full">
                        ACTIVE
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <button
            onClick={handleRespond}
            className="px-6 py-2 rounded-full border border-blue-500 text-blue-600 font-semibold hover:bg-blue-50"
          >
            Respond to Accident
          </button>
        </div>

        {/* 🔥 RESPOND MODAL (CORRECT PLACE) */}
        <RespondModal
          open={respondOpen}
          onClose={() => setRespondOpen(false)}
          onSubmit={handleSubmitResponse}
          ambulances={ambulances}
        />
      </div>
    </div>
  );
}
