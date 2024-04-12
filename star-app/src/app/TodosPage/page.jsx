import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const AllTodos = () => {
  return (
    <div>
      AllTodos
      <div>
        <Link href="/TodosPage/newTodo">
          <FontAwesomeIcon icon={faCirclePlus} className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default AllTodos;
