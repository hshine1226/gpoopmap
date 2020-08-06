import express from "express";
import routes from "../routes";
import { postJoin, postLogin, logout } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.post(routes.join, postJoin);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.logout, logout);

export default globalRouter;
