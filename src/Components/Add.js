import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import Axios from "axios";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function InputAdornments(props) {
  const {
    location: {
      state: { lat: latt, lng: long },
    },
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(lat, lng, name, type);
    Axios.post("/api/toilet", { lat, lng, name, type });
  };

  const handleLatChange = (event) => {
    setLat(event.target.value);
  };

  const handleLngChange = (event) => {
    setLng(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lat"
          label="위도"
          name="lat"
          autoFocus
          onChange={handleLatChange}
          value={latt}
          disabled
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lng"
          label="경도"
          name="lng"
          autoFocus
          onChange={handleLngChange}
          value={long}
          disabled
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="화장실명"
          name="name"
          autoFocus
          onChange={handleNameChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="type"
          label="화장실 구분"
          name="type"
          autoFocus
          onChange={handleTypeChange}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          제출하기
        </Button>
      </form>
    </Container>
  );
}
