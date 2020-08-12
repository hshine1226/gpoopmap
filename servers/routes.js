// Global routes
const HOME = "/";

// API routes
const API = "/api";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/user/logout";
const USER = "/users/user";
const ME = "/me";
const POST_TOILET = "/toilet";
const NEAR_TOILETS = "/toilets/nearby";

const routes = {
  // Global routes
  home: HOME,

  // Api routes
  api: API,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  me: ME,
  postToilet: POST_TOILET,
  nearToilets: NEAR_TOILETS,
  getUser: USER,
};

export default routes;
