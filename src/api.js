import axios from "axios";

const baseURL = "https://gpoopmap-server.herokuapp.com/api";
// http://localhost:4000/api
const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const userApi = {
  join: (name, email, password) => api.post("/join", { name, email, password }),
  login: (email, password) => api.post("/login", { email, password }),
  logout: () => api.get("/logout"),
  getUserByEmail: (email) => api.get("/users/user", { params: { email } }),
  updateProfile: (id, formData) => api.post(`/users/${id}`, formData),
};

export const toiletApi = {
  uploadToilet: (formData) => api.post("/toilet", formData),
  nearToilets: (lat, lng) =>
    api.get("/toilets/nearby", { params: { lat, lng } }),
};
