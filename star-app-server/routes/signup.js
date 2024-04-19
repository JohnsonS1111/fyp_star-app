const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectToMongoDB = require("../dbConfig/dbConfig");

connectToMongoDB()
router.post("/", async (req, res, next) => {
  try {
    console.log("POST RAN");
   
    const { username, email, hashedPassword } = await req.body;

    console.log(reqBody);

    const newUser = new User({
      username,
      email,
      hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    return res
      .status(201)
      .json({ message: "User successfully created", success: true, savedUser });
  } catch (error) {
    return res.status(500).json({ message: "Error signing up: ", error });
  }
});

router.post("/checkUser", async (req, res) => {
  try {
   
    const { email } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(200).json({ message: "User already exists" });
    } else {
      return res.status(400).json({ message: "User does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
