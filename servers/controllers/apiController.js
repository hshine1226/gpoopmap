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
