import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DeleteBlock = () => {
  return (
    <FontAwesomeIcon icon={faTrash} className="text-grey-500 hover:text-red-600" />
  );
};

export default DeleteBlock;
