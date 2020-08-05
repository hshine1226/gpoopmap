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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
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
    console.log(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      emailError: false,
      emailHelperText: "",
      passwordError: false,
      passwordHelperText: "",
      joinSuccess: false,
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
    this.setState({ name: event.target.value });
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handlePWChange(event) {
    this.setState({ password: event.target.value });
  }
  handlePW2Change(event) {
    this.setState({ password2: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { name, email, password, password2 } = this.state;

    this.setState({
      emailError: false,
      emailHelperText: "",
      passwordError: false,
      passwordHelperText: "",
    });

    axios
      .post("http://localhost:6001/join", {
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
          console.log("회원가입 완료");
          this.setState({
            joinSuccess: true,
          });
        } else {
          if (error === "Invalidpassword") {
            this.setState({
              passwordError: true,
              passwordHelperText: "비밀번호를 확인해주세요.",
            });
            this.inputPassword.querySelector("input").focus();
            console.log("패스워드 불일치");
          } else if (error === "userExist") {
            this.setState({
              emailError: true,
              emailHelperText: "해당 이메일이 존재합니다.",
            });
            console.log("유저 존재");
          }
        }
      })
      .catch((error) => console.log(error));
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
  componentDidMount() {
    console.log("Mount");
    console.log(this.props.history);
  }
  render() {
    console.log("render");
    console.log("props:", this.props);
    const {
      emailError,
      emailHelperText,
      passwordError,
      passwordHelperText,
      joinSuccess,
    } = this.state;

    if (joinSuccess) {
      console.log(this.props);
    }

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
                  error={passwordError}
                  helperText={passwordHelperText}
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
