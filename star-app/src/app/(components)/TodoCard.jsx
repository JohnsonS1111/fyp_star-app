import React from "react";
import DeleteBlock from "./DeleteBlock";
import TodoPriority from "./TodoPriority";
import TodoProgress from "./TodoProgress";
import Status from "./Status";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";

const TodoCard = ({ todo }) => {
  return (
    <div className="flex flex-col bg-todo hover:bg-todo-hover outline-black-5px rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <TodoPriority priority={todo.priority} />
        <div className="ml-auto">
          <DeleteBlock />
        </div>
      </div>
      <h3>{todo.title}</h3>
      <div className="flex flex-col">
        <p className="text-xs my-1">{todo.createdAt}</p>
        <TodoProgress progess={todo.progess} />
      </div>
      <div className="ml-auto flex items-end">
        <Status status={todo.status} />
      </div>
    </div>
  );
};

export default TodoCard;
