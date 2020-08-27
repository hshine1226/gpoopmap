import axios from "axios";

const baseURL = "https://gpoopmap-server.herokuapp.com/api";
// const localURL = "http://localhost:4000/api";
const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const userApi = {
  join: (name, email, password, passwordConfirm) =>
    api.post("/join", { name, email, password, passwordConfirm }),
  login: (email, password) => api.post("/login", { email, password }),
  logout: () => api.get("/logout"),
  getUserByEmail: (email) => api.get("/users/user", { params: { email } }),
  updateProfile: (id, formData) => api.post(`/users/user/${id}`, formData),
};

export const toiletApi = {
  uploadToilet: (formData) => api.post("/toilets/toilet", formData),
  nearToilets: (lat, lng, maxDistance) =>
    api.get("/toilets/nearby", { params: { lat, lng, maxDistance } }),
  getToilet: (id) => api.get(`/toilets/toilet/${id}`),
};
