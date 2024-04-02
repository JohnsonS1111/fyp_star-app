import TodoForm from "@/app/(components)/TodoForm";
import React from "react";

const getTodosById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Todos/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new error("Failed to update task");
  }

  return res.json();
};

const TodosPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;
  let updateTaskData = {};
  if (EDITMODE) {
    updateTaskData = await getTodosById(params.id);
    updateTaskData = updateTaskData.foundTask;
  }else{
    updateTaskData = {
      _id: "new",
    };
  }
  return <TodoForm todo={updateTaskData}/>;
};

export default TodosPage;
