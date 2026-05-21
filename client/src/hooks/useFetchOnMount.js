import { useState, useEffect } from "react";

/**
 * Hook for fetching data on component mount
 * Handles loading, error, and data states
 * @param {function} fetchFn - async function that returns data
 * @param {array} dependencies - optional dependency array for re-fetching
 * @returns {object} - { data, loading, error, refetch }
 */
export function useFetchOnMount(fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Unknown error";
      setError(message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when dependencies change
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch,
  };
}
