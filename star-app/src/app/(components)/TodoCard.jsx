import React from "react";
import Status from "./Status";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";
import DeleteIcon from "./DeleteIcon";
import Link from "next/link";

const TodoCard = (todo) => {
  const formatTimeStamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-ie", options);
    return formattedDate;
  };
  return (
    <div className="flex flex-col bg-todo-hover outline-black-5px rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <TodoPriority priority={todo.priority} />
        <div className="ml-auto">
          <DeleteIcon id={faTicket._id} />
        </div>
      </div>
      <Link href={`/TodosPage/${todo._id}`} style={{ display: "contents" }}>
        <h4>{todo.title}</h4>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">{formatTimeStamp(todo.createdAt)}</p>
          </div>
          <div className="ml-auto flex items-end">
            <Status />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TodoCard;
