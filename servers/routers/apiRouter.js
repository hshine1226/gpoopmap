import express from "express";
import routes from "../routes";
import { getMe } from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.get(routes.me, getMe);

export default apiRouter;
