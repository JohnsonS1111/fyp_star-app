"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TodoForm = ({ todo }) => {
  const EDITMODE = todo._id == "new" ? false : true;
  const router = useRouter();
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (EDITMODE) {
      const res = await fetch(`/api/Todos/${todo._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("failed to update task.");
      }
    } else {
      const res = await fetch("/api/Todos", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("Unable to create task.");
      }
    }

    router.refresh();
    router.push("/");
  };

  const startingTodoData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Project",
  };

  if (EDITMODE) {
    startingTodoData["title"] = todo.title;
    startingTodoData["description"] = todo.description;
    startingTodoData["priority"] = todo.priority;
    startingTodoData["progress"] = todo.progress;
    startingTodoData["status"] = todo.status;
    startingTodoData["category"] = todo.category;
  }

  const [formData, setFormData] = useState(startingTodoData);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update Task" : "Create Task"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />

        <label>Details</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Project">Project</option>
          <option value="Exam">Exam</option>
          <option value="Event">Event</option>
          <option value="Assignment">Assignment</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>

          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>

          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>

          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>

          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>

        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
          <option value="stuck">Stuck</option>
        </select>
        <input
          type="submit"
          className="btn"
          value={EDITMODE ? "Update Task" : "Create Task"}
        />
      </form>
    </div>
  );
};

export default TodoForm;
