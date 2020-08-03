import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";

import GoogleMap from "../../Components/GoogleMap";

const Container = styled.div``;

const HomePresenter = ({ loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <GoogleMap />
    </Container>
  );

HomePresenter.propTypes = {};

export default HomePresenter;
