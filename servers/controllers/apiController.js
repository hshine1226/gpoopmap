import passport from "passport";
import Toilet from "../models/Toilet";
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

export const getMe = async (req, res) => {
  res.send({ user: req.user });
};

export const postToilet = async (req, res) => {
  const {
    body: { lat, lng, name, type, memo },
  } = req;

  try {
    // 로그인한 유저만 화장실 등록 가능
    if (req.user) {
      const toilet = await Toilet({
        type,
        name,
        memo,
        location: {
          coordinates: [lng, lat],
        },
        creator: req.user.id,
      });

      req.user.toilets.push(toilet.id);
      req.user.save();

      console.log(req.user);
      toilet.save();
      res.status(200);
    }
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};

export const getNearToilets = async (req, res) => {
  const {
    query: { lat, lng },
  } = req;

  console.log(lat, lng);
  // try {
  //   const toilet = await Toilet.find({
  //     location: {
  //       $near: {
  //         $maxDistance: 1000,
  //         $geometry: {
  //           type: "Point",
  //           coordinates: [lng, lat],
  //         },
  //       },
  //     },
  //   }).populate("creator");
  //   console.log(toilet);
  //   res.send(toilet);
  // } catch (error) {
  //   console.log(error);
  // }
};
