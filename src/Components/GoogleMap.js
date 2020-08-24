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
import ToiletCard from "./ToiletCard";
import { connect } from "react-redux";
import { openSnackBar } from "../store/modules/snackBar";
import { toiletApi } from "../api";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 65px);
  position: relative;
`;
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

class GoogleMap extends Component {
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
      const success = (pos) => {
        const {
          coords: { latitude: lat, longitude: lng },
        } = pos;

        this.setState({
          center: { lat, lng },
          currentLoc: { lat, lng },
          showingInfoWindow: false,
        });
      };

      navigator.geolocation.getCurrentPosition(success, (error) =>
        console.log(error)
      );

      const {
        center: { lat, lng },
      } = this.state;

      try {
        const { data: nearToilets } = await toiletApi.nearToilets(lat, lng);
        this.setState({ nearToilets });
      } catch (error) {
        console.log(error);
      }
    }
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMyLocMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      currentLoc: marker.position,
    });
  };

  handleAddToilet = (history) => (event) => {
    if (!this.props.isLoggedIn) {
      this.props.openSnackBar(
        "error",
        "화장실을 등록하려면 로그인이 필요합니다."
      );
    } else {
      if (this.state.currentLoc) {
        history.push("/add", this.state.currentLoc);
      } else {
        this.props.openSnackBar(
          "error",
          "화장실을 등록하려면 핀등록이 필요합니다."
        );
      }
    }
  };

  centerMoved = async (_, map) => {
    this.setState({
      showingInfoWindow: false,
    });
    const lat = map.center.lat();
    const lng = map.center.lng();
    this.setState({
      center: { lat, lng },
    });

    try {
      const { data: nearToilets } = await toiletApi.nearToilets(lat, lng);
      this.setState({ nearToilets });
    } catch (error) {
      console.log(error);
    }
  };

  myLocMoved = (_, map) => {
    const lat = map.position.lat();
    const lng = map.position.lng();

    this.setState({
      currentLoc: { lat, lng },
    });
  };

  onMapClick = () => {
    this.setState({
      showingInfoWindow: false,
    });
  };

  onCircleClick = () => {
    this.setState({
      showingInfoWindow: false,
    });
  };

  onMapReady = async (_, map) => {
    const lat = map.center.lat();
    const lng = map.center.lng();

    this.setState({
      center: { lat, lng },
    });

    try {
      const { data: nearToilets } = await toiletApi.nearToilets(lat, lng);

      this.setState({ nearToilets });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { history } = this.props;

    const {
      loading,
      center,
      currentLoc,
      nearToilets,
      showingInfoWindow,
    } = this.state;

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
          onClick={this.onMapClick}
          onDragend={this.centerMoved}
          onReady={this.onMapReady}
        >
          {nearToilets && Array.isArray(nearToilets)
            ? nearToilets.map((toilet) => (
                <Marker
                  key={toilet._id}
                  name={toilet.name}
                  memo={toilet.memo}
                  creator={toilet.creator ? toilet.creator : null}
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
                  imageUrl={toilet.imageUrl ? toilet.imageUrl : null}
                  onClick={this.onMarkerClick}
                />
              ))
            : null}
          {currentLoc ? (
            <Marker
              name={"현재 위치"}
              position={currentLoc}
              icon={{
                url: "https://image.flaticon.com/icons/svg/3221/3221248.svg",
                anchor: new this.props.google.maps.Point(40, 40),
                scaledSize: new this.props.google.maps.Size(30, 30),
              }}
              draggable={true}
              onClick={this.onMyLocMarkerClick}
              onDragend={this.myLocMoved}
            />
          ) : null}

          <Circle
            radius={1000}
            center={center}
            strokeColor="transparent"
            strokeOpacity={0}
            strokeWeight={5}
            fillColor="#3F51B5"
            fillOpacity={0.2}
            onClick={this.onCircleClick}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={showingInfoWindow}
          >
            <ToiletCard>{this.state.activeMarker}</ToiletCard>
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
          onClick={this.handleAddToilet(history)}
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

function mapStateToProps(state) {
  const {
    userReducer: { isLoggedIn },
  } = state;
  return { isLoggedIn };
}

function mapDispatchToProps(dispatch) {
  return {
    openSnackBar: (severity, message) =>
      dispatch(openSnackBar(severity, message)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyDVsLljaNNAk_DW6CR8VYnh2o0PHfhRMR4",
    language: "ko-KR",
    LoadingContainer: Loader,
  })(GoogleMap)
);
