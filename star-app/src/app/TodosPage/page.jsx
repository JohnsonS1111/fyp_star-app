import React from "react";
import TodoCard from "../(components)/TodoCard";

const getTodos = async () => {
  try {
    const res = await fetch("http://localhost:5000/todos/displayTodos", {
      cache: "no-store",
      method: "GET",
    });

    return res.json();
  } catch (error) {
    console.log("Failed to get tasks", error);
  }
};

const AllTodos = async () => {
  const { todos } = await getTodos();

  const uniqueCategories = [...new Set(todos?.map(({ category }) => category))];

  return (
    <div className="p-5">
      <div>
        {todos &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div className="mb-4" key={categoryIndex}>
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {todos
                  .filter((todo) => todo.category === uniqueCategory)
                  .map((filteredTask, _index) => (
                    <TodoCard id={_index} key={_index} todo={filteredTask} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllTodos;
