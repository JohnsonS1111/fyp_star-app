import React from "react";
const getTodoInformation = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Todos/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Unable to create this task.");
  }

  return res.json();
};

const TodosPage = async ({ params }) => {
  const EDIT = params.id === "new" ? false : true;
  let updateTodoDetails = {};
  if (EDIT) {
    updateTodoDetails = await getTodoInformation(params.id);
    updateTodoDetails = updateTodoDetails.foundTodo;
  } else {
    updateTodoDetails = {
      _id: "new",
    };
  }
  return <TodoForm todo={updateTodoDetails} />;
};

export default TodosPage;
