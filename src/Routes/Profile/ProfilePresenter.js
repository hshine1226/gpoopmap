import React from "react";
import Loader from "../../Components/Loader";
import Container from "@material-ui/core/Container";
import Profile from "../../Components/Profile";

const ProfilePresenter = ({ loading, history }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Profile history={history} />
    </Container>
  );

export default ProfilePresenter;
