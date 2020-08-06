import React from "react";
import PropTypes from "prop-types";
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

JoinPresenter.propTypes = {};

export default JoinPresenter;
