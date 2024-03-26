"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TodoForm = () => {
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.targer.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("submitted");
  };

  const startingTodoData = {
    title: "Add task Title",
    description: "Add a task decription...",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Project",
  };

  const [formData, setFormData] = useState(startingTodoData);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>Create Task</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData}
        />
      </form>
    </div>
  );
};

export default TodoForm;
