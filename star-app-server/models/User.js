const mongoose = require("mongoose")
const connectToMongoDB = require("../dbConfig/dbConfig")
connectToMongoDB()
const {model, Schema } = require ("mongoose")
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    verifyToken: String,
    verifyTokenExpire: Date,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.Users || mongoose.model("user", userSchema);
module.exports = User;
