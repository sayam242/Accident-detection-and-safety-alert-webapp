import { login, signup, logout } from "../../../services/authService";

export async function loginWithCredentials(payload) {
  return login(payload.email, payload.password);
}

export async function registerHospital(payload) {
  return signup(payload);
}

export function signOut() {
  return logout();
}
