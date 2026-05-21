import { useState, useEffect } from "react";
import * as reportService from "../../../services/reportService";

export function useReports() {
  const [reports, setReports] = useState([]);
  const [responded, setResponded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    setLoading(true);
    const res = await reportService.fetchReports();
    if (res.success) {
      setReports(res.data || []);
      setError("");
    } else {
      setError(res.message || "Failed to fetch reports");
    }
    setLoading(false);
  };

  const fetchResponded = async () => {
    setLoading(true);
    const res = await reportService.fetchResponded();
    if (res.success) {
      setResponded(res.data || []);
      setError("");
    } else {
      setError(res.message || "Failed to fetch responded reports");
    }
    setLoading(false);
  };

  const create = async (payload) => {
    return await reportService.createReport(payload);
  };

  const getOne = async (id) => {
    return await reportService.getReport(id);
  };

  const update = async (id, updates) => {
    return await reportService.updateReport(id, updates);
  };

  useEffect(() => {
    // don't auto-fetch by default; leave it to pages to call
  }, []);

  return {
    reports,
    responded,
    loading,
    error,
    fetchReports,
    fetchResponded,
    create,
    getOne,
    update,
  };
}

export default useReports;
