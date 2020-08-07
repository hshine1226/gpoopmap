import express from "express";
import routes from "../routes";
import {
  getMe,
  postToilet,
  postNearToilets,
} from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.get(routes.me, getMe);
apiRouter.post(routes.toilet, postToilet);
apiRouter.post(routes.near, postNearToilets);

export default apiRouter;
