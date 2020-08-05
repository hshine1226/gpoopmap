import app from "./app";
import dotenv from "dotenv";
import "./db";

dotenv.config();

const PORT = process.env.SERVER_PORT | 6000;

const handleListener = () =>
  console.log(`✅Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListener);
