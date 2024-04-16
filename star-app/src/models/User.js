import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
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
export default User;
