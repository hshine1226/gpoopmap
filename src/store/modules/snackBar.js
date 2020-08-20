// action type
const OPEN_SNACKBAR = "snackBar/OPEN_SNACKBAR";
const CLOSE_SNACKBAR = "snackBar/CLOSE_SNACKBAR";

// action creators
export const openSnackBar = (severity, message) => {
  return { type: OPEN_SNACKBAR, payload: { severity, message } };
};

export const closeSnackBar = () => {
  return { type: CLOSE_SNACKBAR };
};

// reducer
const defaultState = {
  open: false,
  severity: "",
  message: "",
};

export default function snackBarReducer(state = defaultState, action) {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        open: true,
        severity: action.payload.severity,
        message: action.payload.message,
      };
    case CLOSE_SNACKBAR:
      return defaultState;
    default:
      return state;
  }
}
