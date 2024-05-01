const User = require("../models/User");
const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_Secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user; // Attach the decoded user object to the request
    next(); // Call next middleware
  });
}

module.exports = middleware
