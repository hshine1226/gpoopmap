import React, { Component } from "react";
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
import Loader from "./Loader";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 65px);
  position: relative;
`;

export class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      stores: [],
      center: { lat: 36.3142511, lng: 127.45745780000001 },
    };
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      const success = async (pos) => {
        const {
          coords: { latitude: lat, longitude: lng },
        } = pos;

        await this.setState({
          center: { lat, lng },
        });
      };

      const error = (err) => {
        this.setState({
          center: { lat: 36.3142511, lng: 127.45745780000001 },
        });
      };

      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Not Available");
    }
  }

  handleCurrentPosition = async () => {
    this.setState({
      center: { lat: 36.3142511, lng: 127.45745780000001 },
    });
  };

  render() {
    const { loading, center } = this.state;

    const iconStyle = {
      zIndex: 3,
      position: "absolute",
      bottom: "200px",
      right: "4px",
    };

    if (loading) {
      return <Loader />;
    }

    return (
      <Container>
        <Map
          google={this.props.google}
          initialCenter={center}
          center={center}
          zoom={14}
          onClick={this.addMarkers}
        ></Map>
        <Fab
          color="primary"
          aria-label="add"
          style={iconStyle}
          onClick={this.handleCurrentPosition}
        >
          <NavigationIcon />
        </Fab>
      </Container>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDVsLljaNNAk_DW6CR8VYnh2o0PHfhRMR4",
  language: "ko-KR",
  LoadingContainer: Loader,
})(GoogleMap);
