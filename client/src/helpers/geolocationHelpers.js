/**
 * Geolocation helper utilities
 */

const EARTH_RADIUS_METERS = 6371000;

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

function toDegrees(rad) {
  return (rad * 180) / Math.PI;
}

/**
 * Haversine distance between two points in meters
 * Accepts lat/lng in decimal degrees
 */
export function haversineDistanceMeters(lat1, lon1, lat2, lon2) {
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
}

/**
 * Compute bearing from point A to B in degrees (0 = north)
 */
export function bearingDegrees(lat1, lon1, lat2, lon2) {
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const λ1 = toRadians(lon1);
  const λ2 = toRadians(lon2);
  const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
  const θ = Math.atan2(y, x);
  return (toDegrees(θ) + 360) % 360;
}

/**
 * Given center lat/lng and radius in meters, return approximate bounding box
 * Returns { minLat, minLng, maxLat, maxLng }
 */
export function boundingBoxFromCenter(lat, lng, radiusMeters) {
  const latRadians = toRadians(lat);
  const degLat = (radiusMeters / EARTH_RADIUS_METERS) * (180 / Math.PI);
  const degLng = (radiusMeters / (EARTH_RADIUS_METERS * Math.cos(latRadians))) * (180 / Math.PI);

  return {
    minLat: lat - degLat,
    maxLat: lat + degLat,
    minLng: lng - degLng,
    maxLng: lng + degLng,
  };
}

/**
 * Normalize various coordinate inputs to { lat, lng } or null
 * Accepts: {lat,lng}, {latitude,longitude}, [lat,lng] or [lng,lat], string "lat,lng"
 */
export function normalizeCoordinates(input) {
  if (input == null) return null;

  if (typeof input === "string") {
    const parts = input.split(",").map((s) => s.trim());
    if (parts.length >= 2) {
      const a = Number(parts[0]);
      const b = Number(parts[1]);
      if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
      return { lat: a, lng: b };
    }
    return null;
  }

  if (Array.isArray(input) && input.length >= 2) {
    const a = Number(input[0]);
    const b = Number(input[1]);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
    // Heuristic: if first value in [-90,90] treat as lat,lng
    if (a >= -90 && a <= 90 && b >= -180 && b <= 180) return { lat: a, lng: b };
    return { lat: b, lng: a };
  }

  if (typeof input === "object") {
    const lat = input.lat ?? input.latitude ?? input.latitud ?? null;
    const lng = input.lng ?? input.longitude ?? input.long ?? input.lon ?? null;
    if (lat != null && lng != null) return { lat: Number(lat), lng: Number(lng) };
  }

  return null;
}

/**
 * Format coordinates as string "lat,lng" with fixed decimals
 */
export function formatLatLng(lat, lng, decimals = 6) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return "";
  return `${lat.toFixed(decimals)},${lng.toFixed(decimals)}`;
}

export default {
  haversineDistanceMeters,
  bearingDegrees,
  boundingBoxFromCenter,
  normalizeCoordinates,
  formatLatLng,
};
