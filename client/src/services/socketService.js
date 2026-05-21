import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || "";

let socket = null;

/**
 * Initialize socket connection
 */
export function initializeSocket() {
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  return socket;
}

/**
 * Get socket instance (initialize if needed)
 */
export function getSocket() {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
}

/**
 * Check if socket is connected
 */
export function isConnected() {
  return socket && socket.connected;
}

/**
 * Connect socket
 */
export function connect() {
  const sock = getSocket();
  if (!sock.connected) {
    sock.connect();
  }
}

/**
 * Disconnect socket
 */
export function disconnect() {
  if (socket && socket.connected) {
    socket.disconnect();
  }
}

/**
 * Subscribe to a socket event
 * @param {string} event - event name
 * @param {function} handler - callback function
 */
export function on(event, handler) {
  const sock = getSocket();
  sock.on(event, handler);
}

/**
 * Unsubscribe from a socket event
 * @param {string} event - event name
 * @param {function} handler - callback function
 */
export function off(event, handler) {
  if (socket) {
    socket.off(event, handler);
  }
}

/**
 * Emit a socket event
 * @param {string} event - event name
 * @param {any} data - data to send
 */
export function emit(event, data) {
  const sock = getSocket();
  sock.emit(event, data);
}

/**
 * Join hospital room
 * @param {string} hospitalId - hospital ID
 */
export function joinHospitalRoom(hospitalId) {
  emit("join-hospital", hospitalId);
}

/**
 * Listen for new accident events
 * @param {function} callback - handler
 */
export function onNewAccident(callback) {
  on("new-accident", callback);
}

/**
 * Stop listening for new accident events
 * @param {function} callback - handler
 */
export function offNewAccident(callback) {
  off("new-accident", callback);
}

/**
 * Listen for report finalized events
 * @param {function} callback - handler
 */
export function onReportFinalized(callback) {
  on("report-finalized", callback);
}

/**
 * Stop listening for report finalized events
 * @param {function} callback - handler
 */
export function offReportFinalized(callback) {
  off("report-finalized", callback);
}
