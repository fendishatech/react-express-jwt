const User = require("../models/user.model");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json({ success: true, payload: users });
  } catch (error) {
    return res.json({ success: false, message: `${error}` });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    return res.json({ success: true, payload: user });
  } catch (error) {
    return res.json({ success: false, message: `${error}` });
  }
};

module.exports = {
  getUsers,
  getUser,
};
