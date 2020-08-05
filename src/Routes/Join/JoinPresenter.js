import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Join from "../../Components/Join.js";

const Container = styled.div``;

const JoinPresenter = ({ loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Join />
    </Container>
  );

JoinPresenter.propTypes = {};

export default JoinPresenter;
