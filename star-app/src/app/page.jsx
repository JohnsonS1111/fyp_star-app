import React from "react";
import TodoCard from "./(components)/TodoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";

const getTodos = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Todos", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("failed to retrieve data", error);
  }
};

const Dashboard = async () => {
  const { todos } = await getTodos();
  const uniqueCategories = [
    ...new Set(todos?.map(({ category }) => category)),
  ];
  return (
    <div className="p-5">
      <div>
        {todos &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              {todos
                .filter((todo) => todo.category === uniqueCategory)
                .map((filteredTask, _index) => (
                  <TodoCard id={_index} key={_index} todo={filteredTask} />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
