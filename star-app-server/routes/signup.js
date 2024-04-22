const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectToMongoDB = require("../dbConfig/dbConfig.js");

router.post("/", async (req, res) => {
  try {
    console.log("POST 2 RTAN");
    const reqBody = await req.body;
    await connectToMongoDB();
    const { username, email, password } = reqBody;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

   if(!newUser){
    console.log("no new user created")
   }
    return res
      .status(201)
      .json({ message: "User successfully created", success: true, newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error signing up: ", error });
  }
});

router.post("/checkUser", async (req, res) => {
  try {
    console.log("POST RAN ***");
    const { email } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      console.log("if found user");
      return res.status(400).json({ message: "User already exists" });
    } else {
      console.log("if not found user");
      return res.status(200).json({ message: "User does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
