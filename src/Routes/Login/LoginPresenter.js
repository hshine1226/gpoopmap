import React from "react";
import Loader from "../../Components/Loader";
import Container from "@material-ui/core/Container";
import Login from "../../Components/Login";

const LoginPresenter = ({ loading, history }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Login history={history} />
    </Container>
  );

export default LoginPresenter;
