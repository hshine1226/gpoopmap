import Toilet from "../models/Toilet";

export const getMe = async (req, res) => {
  res.send({ user: req.user });
};

export const postToilet = async (req, res) => {
  const {
    body: { lat, lng, name, type },
  } = req;

  try {
    const toilet = await Toilet({
      type,
      name,
      location: {
        coordinates: [lat, lng],
      },
    });
    toilet.save();
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

  console.log(lng, lat);

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
