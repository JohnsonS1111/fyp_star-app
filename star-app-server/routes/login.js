const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const connectToMongoDB = require("../dbConfig/dbConfig.js");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    await connectToMongoDB();
    const { email, password } = req.body; // Use req.body instead of req.json()
    console.log("LoginPOST RAN");

    console.log(email);
    console.log(password);
    const existingUser = await User.findOne({ email }).select("password");
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const passCheck = await bcrypt.compare(password, existingUser.password);
    if (!passCheck) {
      return res.status(400).json({ message: "Incorrect Password" }); // Fix typo in message
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    delete existingUser.password;

    res.cookie("jwt", token, {
      // Remove extra space in cookie name
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ token, existingUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
