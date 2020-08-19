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
import Axios from "axios";
import { Alert } from "@material-ui/lab";
import Modal from "./Modal";
import { connect } from "react-redux";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 65px);
  position: relative;
`;

const AlertContainer = styled.div`
  z-index: 3;
  right: 75px;
  bottom: 205px;
  position: absolute;
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
      isCurrentLoc: false,

      modalOpen: false,
      modalTitle: "",
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
          isCurrentLoc: true,
          showingInfoWindow: false,
        });
      };

      navigator.geolocation.getCurrentPosition(success, (error) =>
        console.log(error)
      );

      Axios.get("/api/toilets/nearby", {
        params: { lat: this.state.center.lat, lng: this.state.center.lng },
      }).then((response) => {
        const { data: nearToilets } = response;

        this.setState({
          nearToilets,
        });
      });
    } else {
      console.log("Not Available");
    }
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

  handleAddToilet = (history) => (event) => {
    if (!this.props.isLoggedIn) {
      alert("로그인을 해주세요");
    } else {
      if (this.state.currentLoc) {
        history.push("/add", this.state.currentLoc);
      } else {
        alert("현재 위치 핀을 등록해주세요.");
      }
    }
  };

  centerMoved = (mapProps, map) => {
    this.setState({
      showingInfoWindow: false,
    });
    const lat = map.center.lat();
    const lng = map.center.lng();
    this.setState({
      center: { lat, lng },
    });
    Axios.get("/api/toilets/nearby", {
      params: { lng: lng, lat: lat },
    }).then((response) => {
      const { data: nearToilets } = response;

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

  onMapClick = (mapProps, map, clickEvent) => {
    this.setState({
      showingInfoWindow: false,
    });
  };

  onCircleClick = () => {
    this.setState({
      showingInfoWindow: false,
    });
  };

  onMapReady = (_, map) => {
    const lat = map.center.lat();
    const lng = map.center.lng();

    this.setState({
      center: { lat, lng },
    });
    Axios.get("/api/toilets/nearby", {
      params: { lng: lng, lat: lat },
    }).then((response) => {
      const { data: nearToilets } = response;

      this.setState({
        nearToilets,
      });
    });
  };

  render() {
    console.log(this.props);
    const { history } = this.props;

    const {
      loading,
      center,
      currentLoc,
      nearToilets,
      isCurrentLoc,
      showingInfoWindow,
      modalOpen,
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
          {nearToilets
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
            // onMouseover={() => console.log("mouseover")}
            // onClick={() => console.log("click")}
            // onMouseout={() => console.log("mouseout")}
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
        {!isCurrentLoc ? (
          <AlertContainer>
            <Alert severity="info">
              화장실을 등록하려면 현재 위치가 필요해요.
            </Alert>
          </AlertContainer>
        ) : null}

        <Modal modalOpen={modalOpen} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state;
  return { isLoggedIn };
}

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: "AIzaSyDVsLljaNNAk_DW6CR8VYnh2o0PHfhRMR4",
    language: "ko-KR",
    LoadingContainer: Loader,
  })(GoogleMap)
);
