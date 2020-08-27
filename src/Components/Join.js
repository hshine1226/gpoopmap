import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { openSnackBar } from "../store/modules/snackBar";
import { userApi } from "../api";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        대똥여지도
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Join({ history, openSnackBar }) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [verifiedPasswordError, setVerifiedPasswordError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [verifiedPasswordHelperText, setVerifiedPasswordHelperText] = useState(
    ""
  );

  const handleNameChange = (event) => {
    const {
      target: { value },
    } = event;
    setName(value);

    if (value.length < 2) {
      setNameError(true);
      setNameHelperText("2자 이상의 이름을 입력해주세요.");
    } else {
      setNameError(false);
      setNameHelperText("");
    }
  };

  const handleEmailChange = async (event) => {
    const {
      target: { value },
    } = event;
    setEmail(value);
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

    if (value.match(emailRegExp)) {
      setEmailError(false);
      setEmailHelperText("");
      try {
        const {
          data: { user },
        } = await userApi.getUserByEmail(value);

        if (user) {
          setEmailError(true);
          setEmailHelperText("해당 이메일이 이미 존재합니다.");
        }
      } catch (error) {
        setEmailError(false);
        setEmailHelperText("");
      }
    } else {
      setEmailError(true);
      setEmailHelperText("유효한 이메일 주소를 입력해주세요.");
    }
  };

  const handlePWChange = (event) => {
    const {
      target: { value },
    } = event;

    setPassword(value);

    if (value.length < 8) {
      setPasswordError(true);
      setPasswordHelperText("8자 이상의 비밀번호를 입력해주세요.");
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }
  };
  const handlePW2Change = (event) => {
    const {
      target: { value },
    } = event;

    setPasswordConfirm(value);

    if (value === password) {
      setVerifiedPasswordError(false);
      setVerifiedPasswordHelperText("");
    } else {
      setVerifiedPasswordError(true);
      setVerifiedPasswordHelperText("일치하는 패스워드를 입력해주세요.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // !emailError
    if (!nameError && !passwordError && !verifiedPasswordError) {
      try {
        const response = await userApi.join(
          name,
          email,
          password,
          passwordConfirm
        );
        console.log(response);

        const {
          data: { user },
        } = response;

        if (user) {
          history.push("/");
          openSnackBar("success", "회원가입이 성공적으로 완료되었습니다.");
        }
      } catch (error) {
        const {
          response: {
            data: { error: message },
          },
        } = error;
        console.log(message);
      }
    } else {
      console.log("An error has occured.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={nameError}
                helperText={nameHelperText}
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={emailError}
                helperText={emailHelperText}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordError}
                helperText={passwordHelperText}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePWChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={verifiedPasswordError}
                helperText={verifiedPasswordHelperText}
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Verified Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={handlePW2Change}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                이미 계정을 가지고 계신가요?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    openSnackBar: (severity, message) =>
      dispatch(openSnackBar(severity, message)),
  };
}
export default connect(null, mapDispatchToProps)(Join);
