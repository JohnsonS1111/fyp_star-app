const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const connectToMongoDB = require("../dbConfig/dbConfig");
const middleware = require("../middleware/middleware")

// Connect to MongoDB when the server starts
connectToMongoDB();

// Middleware to parse JSON bodies
router.use(express.json());

// Create a new task
router.post("/", async (req, res) => {
  try {

    const formData = req.body;
    const newTodo = await Todo.create(formData);
    console.log("Task Created:", newTodo);
    return res.status(201).json({ message: "Task Created" });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Error", error });
  }
});

// Retrieve all tasks
router.get("/displayTodos", async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log("GET RAN:", todos.length, "todos found");
    return res.status(200).json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ message: "Error", error });
  }
});

// Retrieve a task by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundTask = await Todo.findOne({ _id: id });
    console.log("Found Task:", foundTask);
    return res.status(200).json({ message: "Found Task", foundTask });
  } catch (error) {
    console.error("Error finding task:", error);
    return res.status(500).json({ message: "Error", error });
  }
});

// Delete a task by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    console.log("Task Deleted:", id);
    return res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "Error", error });
  }
});

// Update a task by ID
router.put("/:id",  async (req, res) => {
  const { id } = req.params;
  const formData = req.body;
  try {
    const updatedTask = await Todo.findByIdAndUpdate(id, formData, {
      new: true,
    });
    if (!updatedTask) {
      console.error("Task not found for update:", id);
      return res.status(404).json({ message: "Task not found" });
    }
    console.log("Task Updated:", updatedTask);
    return res.status(200).json({ message: "Task Updated", updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Error", error });
  }
});

module.exports = router;
