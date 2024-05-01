"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TodoForm = ({ todo }) => {
  const EDITMODE = todo._id === "new" ? false : true;
  const router = useRouter();

  

  // Initialize form data state
  const [formData, setFormData] = useState({
    title: todo.title || "", // Set title to empty string if undefined
    description: todo.description || "", // Set description to empty string if undefined
    priority: todo.priority || 1, // Set priority to 1 if undefined
    progress: todo.progress || 0, // Set progress to 0 if undefined
    status: todo.status || "not started", // Set status to "not started" if undefined
    category: todo.category || "Project", // Set category to "Project" if undefined
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = EDITMODE ? `http://localhost:5000/todos/${todo._id}` : "http://localhost:5000/todos/";
      const method = EDITMODE ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(EDITMODE ? "Failed to update task." : "Failed to create task.");
      }

      router.push("/TodosPage"); // Navigate to home page after successful submission
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" onSubmit={handleSubmit}>
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
          {[1, 2, 3, 4, 5].map((priority) => (
            <React.Fragment key={priority}>
              <input
                id={`priority-${priority}`}
                name="priority"
                type="radio"
                onChange={handleChange}
                value={priority}
                checked={formData.priority === priority}
              />
              <label>{priority}</label>
            </React.Fragment>
          ))}
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