const Todo = require("../models/Todo")

async function getTodo(req, res, next) {
  let foundtodo;
  try {
    foundtodo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Cannot find task" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = getSubscriber;
