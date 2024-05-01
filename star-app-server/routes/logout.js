const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.clearCookie("jwt")
    res.status(200).json({ message: "Logout successful", sucess: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;