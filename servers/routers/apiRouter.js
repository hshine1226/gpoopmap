import express from "express";
import routes from "../routes";
import {
  getMe,
  postToilet,
  postJoin,
  postLogin,
  logout,
  getNearToilets,
} from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.post(routes.join, postJoin);
apiRouter.post(routes.login, postLogin);
apiRouter.get(routes.logout, logout);
apiRouter.get(routes.me, getMe);
apiRouter.post(routes.postToilet, postToilet);
apiRouter.get(routes.nearToilets, getNearToilets);

export default apiRouter;
