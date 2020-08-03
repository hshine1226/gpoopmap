import React, { Component } from "react";
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
import Loader from "./Loader";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";

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
      activeMarker: {},
      showingInfoWindow: false,
      markerCenter: null,
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
    if ("geolocation" in navigator) {
      const success = async (pos) => {
        const {
          coords: { latitude: lat, longitude: lng },
        } = pos;

        await this.setState({
          center: { lat, lng },
          markerCenter: { lat, lng },
        });
      };

      const error = (err) => {
        this.setState({
          center: { lat: 36.3142511, lng: 127.45745780000001 },
          markerCenter: { lat: 36.3142511, lng: 127.45745780000001 },
        });
      };

      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Not Available");
    }
  };

  onMarkerClick = (props, marker, e) => {
    console.log(marker);

    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      markerCenter: marker.position,
    });
  };

  render() {
    const { loading, center, markerCenter } = this.state;

    const iconStyle = {
      zIndex: 3,
      position: "absolute",
      bottom: "200px",
      right: "4px",
    };

    const addStyle = {
      zIndex: 3,
      position: "absolute",
      bottom: "270px",
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
        >
          <Marker
            name={"내위치"}
            position={markerCenter}
            icon={{
              url: "https://image.flaticon.com/icons/png/512/66/66884.png",
              anchor: new this.props.google.maps.Point(40, 40),
              scaledSize: new this.props.google.maps.Size(40, 40),
            }}
            draggable={true}
            onClick={this.onMarkerClick}
          />
          <InfoWindow marker={this.state.activeMarker} visible={true}>
            <div>
              <p>{this.state.activeMarker.name}</p>
            </div>
          </InfoWindow>
        </Map>
        <Fab
          color="primary"
          aria-label="add"
          style={iconStyle}
          onClick={this.handleCurrentPosition}
        >
          <NavigationIcon />
        </Fab>
        <Tooltip title="화장실 추가" aria-label="add" style={addStyle}>
          <Fab color="primary">
            <AddIcon />
          </Fab>
        </Tooltip>
      </Container>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDVsLljaNNAk_DW6CR8VYnh2o0PHfhRMR4",
  language: "ko-KR",
  LoadingContainer: Loader,
})(GoogleMap);
