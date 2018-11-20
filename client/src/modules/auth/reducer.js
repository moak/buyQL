import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_UPDATE } from "./constants";

const initialState = {
  isLoggued: false,
  error: null,
  token: null,
  first_name: null,
  last_name: null,
  email: null,
  user_id: null
};

export default function sudoku(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
    case AUTH_UPDATE:
      return {
        ...state,
        isLoggued: true,
        token: action.payload.token,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email: action.payload.email,
        role: action.payload.role,
        user_id: action.payload.user_id
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isLoggued: false,
        token: null,
        first_name: null,
        last_name: null,
        role: null,
        email: null,
        user_id: null
      };

    default:
      return state;
  }
}
