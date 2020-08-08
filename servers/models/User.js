import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  toilets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Toilet" }],
  avatarUrl: String,
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", userSchema);

export default model;
