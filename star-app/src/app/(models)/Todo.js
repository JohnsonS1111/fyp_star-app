import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const todoSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    status: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.models.Todo || mongoose.model("Ticket", todoSchema);
export default Todo;
