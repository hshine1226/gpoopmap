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
  updateUser,
} from "../controllers/apiController";
import { uploadImage, uploadAvatar } from "../ middlewares";

const apiRouter = express.Router();

apiRouter.post(routes.join, postJoin);
apiRouter.post(routes.login, postLogin);
apiRouter.get(routes.logout, logout);
apiRouter.get(routes.me, getMe);
apiRouter.post(routes.postToilet, uploadImage, postToilet);
apiRouter.get(routes.nearToilets, getNearToilets);
apiRouter.get(routes.getUser, getUser);
apiRouter.post(routes.user, uploadAvatar, updateUser);

export default apiRouter;
