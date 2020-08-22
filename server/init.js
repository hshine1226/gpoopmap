import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

const PORT = process.env.SERVER_PORT | 3001;

const handleListener = () =>
  console.log(`✅Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListener);
