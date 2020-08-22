import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Toilet from "./models/Toilet";

dotenv.config();

mongoose.connect(process.env.MONGO_URL_PROD || process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ connected to DB");

const handleError = (error) =>
  console.log(`❌ Error on DB connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);

const jsonToDB = () => {
  fs.readFile(__dirname + "/toilet-data.json", "utf-8", async (error, data) => {
    if (error) throw error;

    const response = JSON.parse(data);

    for (let i in response.records) {
      if (response.records[i].경도 & response.records[i].위도) {
        const toilet = new Toilet({
          name: response.records[i].화장실명,
          location: {
            coordinates: [
              // geoJson 객체 타입에서는 경도(Lng), 위도(Lat) 순으로 좌표를 가짐
              parseFloat(response.records[i].경도),
              parseFloat(response.records[i].위도),
            ],
          },
          type: response.records[i].구분,
          hours: response.records[i].개방시간,
        });
        try {
          toilet.save();
        } catch (error) {
          console.log(error);
        }
      }
      console.log(i);
    }
    console.log("FINISHED!!!");
  });
};

// setTimeout(jsonToDB, 5000);
