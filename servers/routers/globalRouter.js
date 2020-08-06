import express from "express";
import routes from "../routes";
import { postJoin, postLogin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.post(routes.join, postJoin);
globalRouter.post(routes.login, postLogin);

export default globalRouter;
