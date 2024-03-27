"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TodoForm = ({ todo }) => {
  const EDIT = todo._id === "new" ? false : true;
  const router = useRouter();

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (EDIT) {
      const res = await fetch(`/api/Todos/${todo._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application.json",
      });

      if (!res.ok) {
        throw new Error("Unable to update task details");
      }
    } else {
      const res = await fetch(`/api/Todos/${todo._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application.json",
      });

      if (!res.ok) {
        throw new Error("Unable to create a new task");
      }
    }
    router.refresh();
    router.push("/");
  };

  const startingTaskData = {
    title: "",
    description: "",
    status: "not started",
    category: "Event",
  };

  const [formData, setFormData] = useState(startingTaskData);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h3>{EDIT ? "Update Task" : "Create Task"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />

        <label>Description </label>
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
          <option value="to-do">To-do</option>
          <option value="assignment">Assignment</option>
          <option value="event">Event</option>
          <option value="project">Project</option>
        </select>

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="completed">Completed</option>
          <option value="stuck">Stuck</option>
        </select>
        <input
          type="submit"
          className="btn"
          value={EDIT ? "Update your task" : "Create Your Task"}
        />
      </form>
    </div>
  );
};

export default TodoForm;
