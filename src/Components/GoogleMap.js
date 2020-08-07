import React, { Component } from "react";
import {
  GoogleApiWrapper,
  Map,
  Marker,
  InfoWindow,
  Circle,
} from "google-maps-react";
import Loader from "./Loader";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Axios from "axios";

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
      center: { lat: 37.66966886, lng: 126.8101355 },
      activeMarker: {},
      showingInfoWindow: false,
      currentLoc: null,
      clickAddToilet: false,
      nearToilets: [],
    };
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      const success = async (pos) => {
        const {
          coords: { latitude: lat, longitude: lng },
        } = pos;

        this.setState({
          center: { lat, lng },
        });
      };

      navigator.geolocation.getCurrentPosition(success, (error) =>
        console.log(error)
      );
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

        this.setState({
          center: { lat, lng },
          currentLoc: { lat, lng },
        });
      };

      navigator.geolocation.getCurrentPosition(success, (error) =>
        console.log(error)
      );
    } else {
      console.log("Not Available");
    }

    Axios.post("/api/near", {
      lng: this.state.center.lng,
      lat: this.state.center.lat,
    }).then((response) => {
      const { data: nearToilets } = response;
      console.log(nearToilets);
      this.setState({
        nearToilets,
      });
    });
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      // currentLoc: marker.position,
    });
  };

  onMyLocMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      currentLoc: marker.position,
    });
  };
  handleAddToilet = (event) => {
    console.log(event);
  };

  centerMoved = (mapProps, map) => {
    // console.log("mapProps", mapProps);
    console.log("Map", map.center);
    const lat = map.center.lat();
    const lng = map.center.lng();
    this.setState({
      center: { lat, lng },
    });
    Axios.post("/api/near", {
      lng: lng,
      lat: lat,
    }).then((response) => {
      const { data: nearToilets } = response;
      console.log(nearToilets);
      this.setState({
        nearToilets,
      });
    });
  };

  myLocMoved = (mapProps, map) => {
    const lat = map.position.lat();
    const lng = map.position.lng();

    this.setState({
      currentLoc: { lat, lng },
    });
  };

  render() {
    const { loading, center, currentLoc, nearToilets } = this.state;

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
          zoom={15}
          onClick={this.addMarkers}
          onDragend={this.centerMoved}
        >
          {nearToilets
            ? nearToilets.map((toilet) => (
                <Marker
                  key={toilet._id}
                  name={toilet.name}
                  position={{
                    lat: toilet.location.coordinates[1],
                    lng: toilet.location.coordinates[0],
                  }}
                  icon={{
                    url:
                      "https://image.flaticon.com/icons/png/512/114/114854.png",
                    anchor: new this.props.google.maps.Point(40, 40),
                    scaledSize: new this.props.google.maps.Size(30, 30),
                  }}
                  onClick={this.onMarkerClick}
                />
              ))
            : null}
          <Marker
            name={"내위치"}
            position={currentLoc}
            icon={{
              url: "https://image.flaticon.com/icons/png/512/66/66884.png",
              anchor: new this.props.google.maps.Point(40, 40),
              scaledSize: new this.props.google.maps.Size(30, 30),
            }}
            draggable={true}
            onClick={this.onMyLocMarkerClick}
            onDragend={this.myLocMoved}
          />

          <Circle
            radius={1000}
            center={center}
            // onMouseover={() => console.log("mouseover")}
            // onClick={() => console.log("click")}
            // onMouseout={() => console.log("mouseout")}
            strokeColor="transparent"
            strokeOpacity={0}
            strokeWeight={5}
            fillColor="#3F51B5"
            fillOpacity={0.2}
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
          <Tooltip title="현재 위치">
            <NavigationIcon />
          </Tooltip>
        </Fab>
        <Tooltip
          onClick={this.handleAddToilet}
          title="화장실 추가"
          aria-label="add"
          style={addStyle}
        >
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
