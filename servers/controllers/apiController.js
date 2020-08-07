import Toilet from "../models/Toilet";

export const getMe = async (req, res) => {
  res.send({ user: req.user });
};

export const postToilet = async (req, res) => {
  const {
    body: { lat, lng, name, type, memo },
  } = req;

  try {
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

export const postNearToilets = async (req, res) => {
  const {
    body: { lng, lat },
  } = req;

  try {
    const toilet = await Toilet.find({
      location: {
        $near: {
          $maxDistance: 1000,
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        },
      },
    });
    res.send(toilet);
  } catch (error) {
    console.log(error);
  }
};
