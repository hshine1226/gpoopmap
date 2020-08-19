import { configureStore } from "@reduxjs/toolkit";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const UPDATE_PROFILE = "UPDATE_PROFILE";

const defaultState = {
  isLoggedIn: false,
  user: {},
};

const loginSuccess = (result) => {
  return { type: LOGIN_SUCCESS, result };
};

const logoutSuccess = () => {
  return { type: LOGOUT_SUCCESS };
};

const updateProfile = (result) => {
  return { type: UPDATE_PROFILE, result };
};

const reducer = (state = defaultState, action) => {
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
};

const store = configureStore({ reducer });

export const actionCreator = { loginSuccess, logoutSuccess, updateProfile };

export default store;
