import React from "react";
import DeleteBlock from "./DeleteBlock";
import TodoPriority from "./TodoPriority";
import TodoProgress from "./TodoProgress";
import Status from "./Status";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";

const TodoCard = () => {
  return (
    <div className="flex flex-col bg-todo-hover outline-black-5px rounded-md shadow-lg p-3 m-2">      <div className="flex mb-3">
        <TodoPriority />
        <div className="ml-auto">
          <DeleteBlock />
        </div>
      </div>
      <h3>Task title</h3>
      <hr className="h-px border-0 bg-page mb-2" />
      <p className="whitespace-pre-wrap"> Please enter task details</p>
      <TodoProgress />
      <Status />
    </div>
  );
};

export default TodoCard;
