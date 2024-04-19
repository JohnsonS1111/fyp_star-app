const mongoose = require("mongoose")


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
const User = mongoose.models.Users || mongoose.model("User", userSchema);
module.exports = User;
