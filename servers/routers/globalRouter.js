import express from "express";
import routes from "../routes";

import { postJoin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.post(routes.join, postJoin);

export default globalRouter;
