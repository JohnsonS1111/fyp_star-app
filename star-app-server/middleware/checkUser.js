const User = require("../models/User");

async function checkUser(req, res, next) {
  let foundUser;
  try {
    foundUser = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.foundUser = foundUser;
  next();
}

module.exports = checkUser;
