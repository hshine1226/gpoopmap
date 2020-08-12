import React from "react";
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
import axios from "axios";
import Axios from "axios";

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

export default class Join extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      nameError: false,
      emailError: false,
      passwordError: false,
      verifiedPasswordError: false,
      nameHelperText: "",
      emailHelperText: "",
      passwordHelperText: "",
      verifiedPasswordHelperText: "",
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handlePW2Change = this.handlePW2Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  useStyles = makeStyles((theme) => ({
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

  handleNameChange(event) {
    const {
      target: { value },
    } = event;
    this.setState({ name: value });

    if (value.length < 2) {
      this.setState({
        nameError: true,
        nameHelperText: "2자 이상의 이름을 입력해주세요.",
      });
    } else {
      this.setState({
        nameError: false,
        nameHelperText: "",
      });
    }
  }
  handleEmailChange(event) {
    const {
      target: { value },
    } = event;
    this.setState({ email: value });
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

    if (value.match(emailRegExp)) {
      this.setState({
        emailError: false,
        emailHelperText: "",
      });

      Axios.get("api/users/user", {
        params: { email: value },
      }).then((response) => {
        const {
          data: { message },
        } = response;
        if (message === "User Exist") {
          this.setState({
            emailError: true,
            emailHelperText: "해당 이메일이 존재합니다.",
          });
        } else {
          this.setState({
            emailError: false,
            emailHelperText: "",
          });
        }
      });
    } else {
      this.setState({
        emailError: true,
        emailHelperText: "유효한 이메일 주소를 입력해주세요.",
      });
    }

    if (this.state.emailError === false) {
    }
  }
  handlePWChange(event) {
    const {
      target: { value },
    } = event;
    this.setState({ password: value });

    if (value.length < 8) {
      this.setState({
        passwordError: true,
        passwordHelperText: "8자 이상의 비밀번호를 입력해주세요.",
      });
    } else {
      this.setState({
        passwordError: false,
        passwordHelperText: "",
      });
    }
  }
  handlePW2Change(event) {
    const {
      target: { value },
    } = event;
    this.setState({ password2: value });

    if (value === this.state.password) {
      this.setState({
        verifiedPasswordError: false,
        verifiedPasswordHelperText: "",
      });
    } else {
      this.setState({
        verifiedPasswordError: true,
        verifiedPasswordHelperText: "일치하는 패스워드를 입력해주세요.",
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {
      name,
      email,
      password,
      password2,
      nameError,
      emailError,
      passwordError,
      verifiedPasswordError,
    } = this.state;

    if (!nameError && !emailError && !passwordError && !verifiedPasswordError) {
      axios
        .post("/api/join", {
          name,
          email,
          password,
          password2,
        })
        .then((response) => {
          const {
            data: { success, error },
          } = response;

          if (success) {
            this.setState({
              joinSuccess: true,
            });
            this.props.history.push("/");
          } else {
            if (error === "userExist") {
              this.setState({
                emailError: true,
                emailHelperText: "해당 이메일이 존재합니다.",
              });
            }
          }
        })
        .catch((error) => console.log(error));
    } else {
      console.log("에러가 있어요");
    }
  }
  inputName;
  inputEmail;
  inputPassword;
  inputPassword2;

  onRefName = (c) => {
    this.inputName = c;
  };
  onRefEmail = (c) => {
    this.inputEmail = c;
  };
  onRefPassword = (c) => {
    this.inputPassword = c;
  };
  onRefPassword2 = (c) => {
    this.inputPassword2 = c;
  };

  render() {
    const {
      nameError,
      nameHelperText,
      emailError,
      emailHelperText,
      passwordError,
      passwordHelperText,
      verifiedPasswordError,
      verifiedPasswordHelperText,
    } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.useStyles.paper}>
          <Avatar className={this.useStyles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <form
            className={this.useStyles.form}
            noValidate
            onSubmit={this.handleSubmit}
          >
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
                  onChange={this.handleNameChange}
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
                  onChange={this.handleEmailChange}
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
                  onChange={this.handlePWChange}
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
                  onChange={this.handlePW2Change}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.useStyles.submit}
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
}
