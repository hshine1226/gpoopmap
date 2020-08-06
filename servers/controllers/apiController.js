export const getMe = async (req, res) => {
  res.send({ user: req.user });
};
