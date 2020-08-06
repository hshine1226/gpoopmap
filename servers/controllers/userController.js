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

export const postLogin = (req, res) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      console.log(error);
    }
    if (user) {
      console.log(user);
      req.login(user, (error) => {
        if (error) {
          console.log(error);
        }
        res.send({ success: true });
      });
    } else {
      res.send({ success: false });
    }
  })(req, res);
};

// export const postLogin = passport.authenticate("local");

export const logout = (req, res) => {
  try {
    req.logout();
    console.log("로그아웃...");
    res.send({ success: true });
  } catch {
    res.send({ success: false });
  }
};
