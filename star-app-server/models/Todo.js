const mongoose = require("mongoose");
const connectToMongoDB = require("../dbConfig/dbConfig");
connectToMongoDB();
const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add task title"],
    },
    description: {
      type: String,
      required: [true, "Please add task description"],
    },
    category: {
      type: String,
      required: [true, "Please add task category"],
    },
    priority: {
      type: Number,
      required: [true, "Please add task priority"],
    },
    progress: Number,
    status: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
module.exports = Todo;
