// action type
const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "user/LOGOUT_SUCCESS";
const UPDATE_PROFILE = "user/UPDATE_PROFILE";

// action creators
export const loginSuccess = (result) => {
  return { type: LOGIN_SUCCESS, result };
};

export const logoutSuccess = () => {
  return { type: LOGOUT_SUCCESS };
};

export const updateProfile = (result) => {
  return { type: UPDATE_PROFILE, result };
};

// reducer
const defaultState = {
  isLoggedIn: false,
  user: {},
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        user: action.result,
      };
    case LOGOUT_SUCCESS:
      return {
        isLoggedIn: false,
        user: {},
      };
    case UPDATE_PROFILE:
      return {
        isLoggedIn: true,
        user: action.result,
      };
    default:
      return state;
  }
}
