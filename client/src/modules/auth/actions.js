import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_UPDATE } from "./constants";

export function loginSuccess(data) {
  return { type: AUTH_LOGIN_SUCCESS, payload: data };
}

export function updateAuth(data) {
  let updatedData = data || JSON.parse(localStorage.getItem("user"));

  if (updatedData.id) {
    updatedData.user_id = updatedData.id;
    delete updatedData.id;
  }

  if (updatedData) {
    localStorage.setItem("user", JSON.stringify(updatedData));
    return { type: AUTH_UPDATE, payload: updatedData };
  }
  return { type: AUTH_LOGOUT };
}
export function logout() {
  localStorage.removeItem("user");
  return { type: AUTH_LOGOUT };
}
