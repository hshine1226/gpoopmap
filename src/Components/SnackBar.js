import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { closeSnackBar } from "../store/modules/snackBar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomizedSnackbars({ open, severity, message, closeSnackBar }) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackBar();
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">{message}</Alert>
      <Alert severity="warning">{message}</Alert>
      <Alert severity="info">{message}</Alert>
      <Alert severity="success">{message}</Alert> */}
    </div>
  );
}

function mapStateToProps(state) {
  const {
    snackBarReducer: { open, severity, message },
  } = state;

  return { open, severity, message };
}

function mapDispatchToProps(dispatch) {
  return { closeSnackBar: () => dispatch(closeSnackBar()) };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizedSnackbars);
