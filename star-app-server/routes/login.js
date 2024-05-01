const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const connectToMongoDB = require("../dbConfig/dbConfig.js");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    await connectToMongoDB();
    const { email, password } = req.body;
    console.log("LoginPOST RAN");

    console.log(email);
    console.log(password);
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if password is correct
    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    // Remove password field from user object
    user.password = undefined;

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log(token);

    // Set JWT token in cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send response with token and user object
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
