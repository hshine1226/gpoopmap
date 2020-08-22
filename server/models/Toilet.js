import mongoose from "mongoose";

const ToiletSchema = new mongoose.Schema({
  type: String,
  name: String,
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number],
  },
  memo: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  imageUrl: {
    type: String,
  },
});

ToiletSchema.index({ location: "2dsphere" });

const model = mongoose.model("Toilet", ToiletSchema);

export default model;
