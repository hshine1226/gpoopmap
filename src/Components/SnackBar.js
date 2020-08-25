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
      {open ? (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      ) : null}
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
