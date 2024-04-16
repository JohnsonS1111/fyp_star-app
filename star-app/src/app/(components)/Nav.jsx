import {
  faHouseChimney,
  faListCheck,
  faPlusSquare,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/" title="Home">
          <FontAwesomeIcon icon={faHouseChimney} className="icon" />
        </Link>
        <Link href="/TodosPage/new" title="Create new task">
          <FontAwesomeIcon icon={faPlusSquare} className="icon" />
        </Link>
        <Link href="/Profile" title="Profile">
          <FontAwesomeIcon icon={faUser} className="icon" />
        </Link>
        <Link href="/Timetable" title="Timetable upload">
          <FontAwesomeIcon icon={faUpload} className="icon"/>
        </Link>
      </div>
      <div></div>
    </nav>
  );
};

export default Nav;
