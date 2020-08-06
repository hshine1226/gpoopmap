import app from "./app";
import dotenv from "dotenv";
import "./db";

dotenv.config();

const PORT = process.env.SERVER_PORT | 3001;

const handleListener = () =>
  console.log(`✅Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListener);
