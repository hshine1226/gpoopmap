import express from "express";
import routes from "../routes";
import {
  getMe,
  postToilet,
  postJoin,
  postLogin,
  logout,
  getNearToilets,
  getUser,
} from "../controllers/apiController";
import { uploadImage } from "../ middlewares";

const apiRouter = express.Router();

apiRouter.post(routes.join, postJoin);
apiRouter.post(routes.login, postLogin);
apiRouter.get(routes.logout, logout);
apiRouter.get(routes.me, getMe);
apiRouter.post(routes.postToilet, uploadImage, postToilet);
apiRouter.get(routes.nearToilets, getNearToilets);
apiRouter.get(routes.getUser, getUser);

export default apiRouter;
