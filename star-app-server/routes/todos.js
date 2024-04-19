const Todo = require("../models/Todo");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("POST RAN");
    if (!req.is("json")) {
      return res.status(400).json({ message: "Request must be JSON" });
    }
    const body = await req.json();

    console.log(body);
    const todoData = body.formData;
    console.log(todoData);
    await Todo.create(todoData);

    return res.status(201).json({ message: "Task Created" });
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({ todos });
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundTask = await Todo.findOne({ _id: id });
    return res.status(200).json({ message: "Found Task", foundTask });
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
});

router.delete("/:id", async (req, res) => {
  console.log("DELETED");
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { formData } = req.body;
    const updateTaskData = await Todo.findByIdAndUpdate(id, formData, {
      new: true,
    });

    if (!updateTaskData) {
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("Update RAN", formData);
    res
      .status(200)
      .json({ message: "Task Updated", updatedTask: updateTaskData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error", error });
  }
});

module.exports = router;
