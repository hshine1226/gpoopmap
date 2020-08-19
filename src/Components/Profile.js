import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import styled from "styled-components";
import Axios from "axios";
import { actionCreator } from "../store";

const ImageUpload = styled.input`
  margin: 20px 0;
  width: 100%;
  height: 50px;
  border: 1px solid black;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
`;

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
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function Profile({ isLoggedIn, user, dispatch }) {
  const classes = useStyles();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", image);
    formData.append("name", name);
    formData.append("email", email);

    Axios.post(`/api/users/${user._id}`, formData).then((response) => {
      const { data: user } = response;

      if (user) {
        dispatch(actionCreator.updateProfile(user));
      }
    });
  };

  return (
    <>
      {isLoggedIn ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar
              alt={user.name}
              src={user?.avatarUrl}
              className={classes.avatar}
            >
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={onNameChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <ImageUpload
                    type="file"
                    name="imageFile"
                    id="file"
                    accept="image/*"
                    onChange={handleImageChange}
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
                수정하기
              </Button>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      ) : null}
    </>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn, user } = state;

  return { isLoggedIn, user };
}

function mapDispatchToProps(dispatch, ownProps) {
  return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
