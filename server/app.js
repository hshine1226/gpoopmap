import express from "express";
// Middlewares
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "./routes";
import apiRouter from "./routers/apiRouter";
import cors from "cors";
import globalRouter from "./routers/globalRouter";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet()); // Express App에 도움을 주는 미들웨어
app.use(cookieParser()); // Session을 다루기 위한 미들웨어
app.use(bodyParser.json()); // 서버가 json을 이해하게 해주는 미들웨어
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 urlencoded를 이해하게 해주는 미들웨어
app.use(morgan("dev")); // Logging에 도움을 주는 미들웨어
app.use(cors());

app.use(
  session({
    // secret: process.env.COOKIE_SECRET,
    secret: "]-+~'I=U,.!wUOYKPj'cSx4%[Bgp`&",
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use(routes.home, globalRouter);
app.use(routes.api, apiRouter);
// app.use(routes.toilets, toiletRouter);
// app.use(routes.users, usersRouter);
// app.use(routes.api, apiRouter);

export default app;
