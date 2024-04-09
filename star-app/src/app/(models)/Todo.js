import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

const todoSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
