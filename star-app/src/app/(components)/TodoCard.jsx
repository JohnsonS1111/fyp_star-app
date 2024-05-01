import React from "react";
import DeleteBlock from "./DeleteBlock";
import TodoPriority from "./TodoPriority";
import TodoProgress from "./TodoProgress";
import Status from "./Status";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const TodoCard = ({ todo }) => {
  
  const formatTime = (timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-ie", options);
    return formattedDate;
  };
  return (
    <div className="flex flex-col bg-todo outline-black-5px rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <TodoPriority priority={todo.priority} />
        <div className="ml-auto space-x-3">
          <DeleteBlock id={todo._id} />
          <Link href={`/TodosPage/${todo._id}`} style={{ display: "contents" }} title="Edit Task details">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-grey-500 hover:text-yellow-300"
            />
          </Link>
        </div>
      </div>
      <h3>{todo.title}</h3>
      <div className="flex flex-col">
        <p className="text-xs my-1">{formatTime(todo.createdAt)}</p>
        <TodoProgress progress={todo.progress} />
      </div>
      <div className="ml-auto flex items-end">
        <Status status={todo.status} />
      </div>
    </div>
  );
};

export default TodoCard;
