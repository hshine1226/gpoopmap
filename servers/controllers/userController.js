import passport from "passport";
import User from "../models/User";

export const postJoin = async (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  console.log(req.body);

  const user = await User.findOne({ email });

  if (password !== password2) {
    // 패스워드 불일치
    res.send({ success: false, error: "Invalidpassword" });
  } else if (user) {
    res.send({ success: false, error: "userExist" });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);
      res.send({ success: true });
    } catch (err) {
      res.status(400);
    }
  }
};
