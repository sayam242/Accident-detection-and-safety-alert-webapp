/* Helper utilities for form handling and validation */

/** Trim and normalize a string value */
export function sanitizeString(value = "") {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

/** Simple email validation */
export function validateEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/** Simple phone validation (digits only, 10-15 length) */
export function validatePhone(phone) {
  if (!phone) return false;
  const digits = String(phone).replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

/** Convert various location shapes to GeoJSON Point */
export function normalizeLocation(loc) {
  if (!loc) return null;

  // If already GeoJSON-like
  if (loc.type === "Point" && Array.isArray(loc.coordinates)) return loc;

  // If { lat, lng } or { latitude, longitude }
  const lat = loc.lat ?? loc.latitude ?? null;
  const lng = loc.lng ?? loc.longitude ?? null;
  if (lat !== null && lng !== null) {
    return { type: "Point", coordinates: [Number(lng), Number(lat)] };
  }

  // If array [lng, lat] or [lat, lng]
  if (Array.isArray(loc) && loc.length >= 2) {
    const a0 = Number(loc[0]);
    const a1 = Number(loc[1]);
    // Heuristic: if first value is between -180 and 180 and second between -90 and 90, treat as [lng,lat]
    if (a0 >= -180 && a0 <= 180 && a1 >= -90 && a1 <= 90) {
      return { type: "Point", coordinates: [a0, a1] };
    }
    // Otherwise assume [lat, lng]
    return { type: "Point", coordinates: [a1, a0] };
  }

  return null;
}

/** Build a FormData object from a plain object. Files/Blobs are appended directly. */
export function buildFormData(obj = {}, form = null, namespace = "") {
  const fd = form || new FormData();

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const formKey = namespace ? `${namespace}[${key}]` : key;

    if (value === undefined || value === null) return;

    // If it's a File/Blob, append directly
    if (value instanceof File || value instanceof Blob) {
      fd.append(formKey, value);
      return;
    }

    // If array, append each item
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (v instanceof File || v instanceof Blob) {
          fd.append(`${formKey}[]`, v);
        } else if (typeof v === "object") {
          fd.append(`${formKey}[]`, JSON.stringify(v));
        } else {
          fd.append(`${formKey}[]`, v);
        }
      });
      return;
    }

    // If object, recurse
    if (typeof value === "object") {
      fd.append(formKey, JSON.stringify(value));
      return;
    }

    // Primitives
    fd.append(formKey, String(value));
  });

  return fd;
}

/** Check if an object has no own enumerable properties */
export function isEmptyObject(obj) {
  return obj == null || (typeof obj === "object" && Object.keys(obj).length === 0);
}

/** Safe parse number with default */
export function toNumber(val, defaultValue = 0) {
  const n = Number(val);
  return Number.isFinite(n) ? n : defaultValue;
}
