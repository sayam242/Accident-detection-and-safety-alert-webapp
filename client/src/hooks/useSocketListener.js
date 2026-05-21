import { useEffect } from "react";
import {
  getSocket,
  on,
  off,
  isConnected,
} from "../services/socketService";

/**
 * Hook for listening to socket events with automatic cleanup
 * Registers listener on mount, unregisters on unmount
 * @param {string} event - socket event name
 * @param {function} handler - callback function
 * @param {array} dependencies - optional dependency array for re-subscribing
 * @returns {void}
 */
export function useSocketListener(event, handler, dependencies = []) {
  useEffect(() => {
    if (!event || !handler) return;

    try {
      // Ensure socket is initialized and connected
      const socket = getSocket();
      
      if (!isConnected()) {
        console.warn(`Socket not connected, attempting to connect...`);
        socket.connect?.();
      }

      // Register listener
      on(event, handler);

      // Cleanup: unregister listener on unmount or dependency change
      return () => {
        off(event, handler);
      };
    } catch (error) {
      console.error(`Error setting up socket listener for ${event}:`, error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, handler, ...dependencies]);
}

/**
 * Hook for listening to new accident events
 * @param {function} callback - handler function
 * @param {array} dependencies - optional dependency array
 */
export function useOnNewAccident(callback, dependencies = []) {
  useSocketListener("new-accident", callback, dependencies);
}

/**
 * Hook for listening to report finalized events
 * @param {function} callback - handler function
 * @param {array} dependencies - optional dependency array
 */
export function useOnReportFinalized(callback, dependencies = []) {
  useSocketListener("report-finalized", callback, dependencies);
}
