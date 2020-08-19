import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Join from "../../Components/Join";

const Container = styled.div``;

const JoinPresenter = ({ loading, history }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Join history={history} />
    </Container>
  );

export default JoinPresenter;
