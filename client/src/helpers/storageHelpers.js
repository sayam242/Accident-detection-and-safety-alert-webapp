/**
 * Storage helper utilities
 * Safe wrappers around localStorage with graceful fallback.
 */

export const STORAGE_KEYS = {
  TOKEN: "token",
  HOSPITAL_ID: "hospitalId",
  HOSPITAL_LOCATION: "hospitalLocation",
};

function getStorage() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return window.localStorage;
}

export function isStorageAvailable() {
  try {
    const storage = getStorage();
    if (!storage) return false;
    const testKey = "__storage_test__";
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

export function setItem(key, value) {
  try {
    const storage = getStorage();
    if (!storage) return false;

    const serialized =
      typeof value === "string" ? value : JSON.stringify(value);

    storage.setItem(key, serialized);
    return true;
  } catch (error) {
    return false;
  }
}

export function getItem(key, fallback = null) {
  try {
    const storage = getStorage();
    if (!storage) return fallback;

    const raw = storage.getItem(key);
    if (raw === null) return fallback;

    return raw;
  } catch (error) {
    return fallback;
  }
}

export function getJsonItem(key, fallback = null) {
  try {
    const raw = getItem(key, null);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

export function removeItem(key) {
  try {
    const storage = getStorage();
    if (!storage) return false;
    storage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

export function clearStorage() {
  try {
    const storage = getStorage();
    if (!storage) return false;
    storage.clear();
    return true;
  } catch (error) {
    return false;
  }
}

export function setAuthSession({ token, hospitalId, hospitalLocation } = {}) {
  if (token) setItem(STORAGE_KEYS.TOKEN, token);
  if (hospitalId) setItem(STORAGE_KEYS.HOSPITAL_ID, hospitalId);

  // Keep same behavior as existing app: can be array/string/object
  if (hospitalLocation !== undefined && hospitalLocation !== null) {
    if (typeof hospitalLocation === "string") {
      setItem(STORAGE_KEYS.HOSPITAL_LOCATION, hospitalLocation);
    } else {
      setItem(STORAGE_KEYS.HOSPITAL_LOCATION, hospitalLocation);
    }
  }
}

export function getAuthSession() {
  return {
    token: getItem(STORAGE_KEYS.TOKEN, ""),
    hospitalId: getItem(STORAGE_KEYS.HOSPITAL_ID, ""),
    hospitalLocation: getItem(STORAGE_KEYS.HOSPITAL_LOCATION, ""),
  };
}

export function clearAuthSession() {
  removeItem(STORAGE_KEYS.TOKEN);
  removeItem(STORAGE_KEYS.HOSPITAL_ID);
  removeItem(STORAGE_KEYS.HOSPITAL_LOCATION);
}