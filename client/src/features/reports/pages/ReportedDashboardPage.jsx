import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DetailsPopup from "../Components/map/DetailsPopup";
import ReportedTable from "../components/ReportedTable";
import { useReports } from "../hooks/useReports";
import { socket } from "../../../socket";

export default function ReportedDashboardPage() {
  const { fetchReports, reports } = useReports();
  const [selectedAccident, setSelectedAccident] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    const handleNewAccident = (data) => {
      fetchReports();
    };
    socket.on("new-accident", handleNewAccident);
    return () => socket.off("new-accident", handleNewAccident);
  }, []);

  useEffect(() => {
    const handleFinalized = ({ reportId }) => {
      // optimistic removal handled by refetch
      fetchReports();
    };
    socket.on("report-finalized", handleFinalized);
    return () => socket.off("report-finalized", handleFinalized);
  }, []);

  const handleViewResponses = (accident) => {
    setSelectedAccident(accident);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAccident(null);
  };

  return (
    <>
      <Navbar />
      <DetailsPopup open={modalOpen} onClose={handleCloseModal} accident={selectedAccident} hospiloc={localStorage.getItem("hospitalLocation")} token={localStorage.getItem("token")} />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Accident Reported</h2>
          </div>
          <ReportedTable reports={reports} onViewResponses={handleViewResponses} />
        </div>
      </div>
    </>
  );
}
