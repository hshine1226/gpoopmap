import express from "express";

// Middlewares
import bodyParser from "body-parser";
import routes from "./routes";
import apiRouter from "./routers/apiRouter";
import cors from "cors";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(bodyParser.json()); // 서버가 json을 이해하게 해주는 미들웨어
app.use(cors());
// Routers
app.use(routes.home, globalRouter);
app.use(routes.api, apiRouter);
// app.use(routes.toilets, toiletRouter);
// app.use(routes.users, usersRouter);
// app.use(routes.api, apiRouter);

export default app;
