"use client"

import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

import React from "react";

const DeleteBlock = ({ id }) => {
  const router = useRouter();
  const deleteTask = async () => {
    const res = await fetch(`http://localhost:3000/api/Todos/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
    }
  };
  return (
    <FontAwesomeIcon
      icon={faTrash}
      className="text-grey-500 hover:text-red-500"
      onClick={deleteTask}
      title="Delete task"
    />
  );
};

export default DeleteBlock;
