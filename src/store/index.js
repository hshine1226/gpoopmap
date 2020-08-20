import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import snackBarReducer from "./modules/snackBar";

export default combineReducers({ userReducer, snackBarReducer });
