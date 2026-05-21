/**
 * Build base API URL from environment variable
 * Removes trailing slash for consistency
 */
export function getBaseURL() {
  const url = import.meta.env.VITE_BACKEND_URL || "";
  return url.replace(/\/$/, "");
}
