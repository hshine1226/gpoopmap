import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@material-ui/core";
import styled from "styled-components";
import Axios from "axios";
import { connect } from "react-redux";
import { openSnackBar } from "../store/modules/snackBar";
const toiletTypes = [
  {
    value: "공중화장실",
    label: "공중화장실",
  },
  {
    value: "개인화장실",
    label: "개인화장실",
  },
  {
    value: "이동화장실",
    label: "이동화장실",
  },
];

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const TextFieldContainer = styled.div`
  width: 350px;
`;

const ImageUpload = styled.input`
  margin: 20px 0;
  width: 100%;
  height: 50px;
  border: 1px solid black;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
`;

function InputAdornments(props) {
  const {
    location: {
      state: { lat: latt, lng: long },
    },
    openSnackBar,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("memo", memo);
    Axios.post("/api/toilet", formData).then((response) => {
      if (response.status === 200) {
        props.history.push("/");
        openSnackBar("success", "화장실이 정상적으로 추가 되었습니다.");
      }
    });
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

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const [lat, setLat] = useState(latt);
  const [lng, setLng] = useState(long);
  const [name, setName] = useState(null);
  const [type, setType] = useState("공중화장실");
  const [memo, setMemo] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    console.log(lat, lng, name, type, memo, image);
  });

  return (
    <Container>
      <TextFieldContainer>
        <form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lat"
            label="위도"
            name="lat"
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
            id="memo"
            label="한줄 메모"
            name="memo"
            onChange={handleMemoChange}
          />

          <TextField
            fullWidth
            margin="normal"
            required
            id="outlined-select-currency"
            select
            label="구분"
            value={type}
            name="type"
            onChange={handleTypeChange}
            helperText="화장실 구분을 선택해주세요."
            variant="outlined"
          >
            {toiletTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <ImageUpload
            type="file"
            name="imageFile"
            id="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <Button type="submit" fullWidth variant="contained" color="primary">
            제출하기
          </Button>
        </form>
      </TextFieldContainer>
    </Container>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    openSnackBar: (severity, message) =>
      dispatch(openSnackBar(severity, message)),
  };
}
export default connect(null, mapDispatchToProps)(InputAdornments);
