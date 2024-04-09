import mongoose, { Schema } from "mongoose";
import Email from "next-auth/providers/email";

mongoose.connect(process.env.MONGODB_URI);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
