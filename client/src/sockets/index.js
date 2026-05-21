/**
 * Socket centralized entry point
 * Re-exports all socket functionality from socketService
 * Allows clean imports: import { getSocket, emit } from 'src/sockets'
 */

export {
  initializeSocket,
  getSocket,
  isConnected,
  connect,
  disconnect,
  on,
  off,
  emit,
  joinHospitalRoom,
  onNewAccident,
  offNewAccident,
  onReportFinalized,
  offReportFinalized,
} from "../services/socketService";
