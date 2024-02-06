import {
  faCalendarAlt,
  faHouseChimney,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="flex flex-col bg-todo-hover outline-black-5px rounded-md shadow-lg p-3 m-2">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <FontAwesomeIcon icon={faHouseChimney} className="icon" />
        </Link>
        <Link href="/TodosPage">
          <FontAwesomeIcon icon={faListCheck} className="icon" />
        </Link>
        <Link href="/Profile">
          <FontAwesomeIcon icon={faUser} className="icon" />
        </Link>
        <Link href="/Calendar">
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
