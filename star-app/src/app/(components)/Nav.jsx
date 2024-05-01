"use client"
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
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/logout/", 
      {
        method: "GET"
      });
      router.push("/Login");
    } catch (error) {
      console.error("Logout failed: ", error);
      // Handle error here (e.g., display error message to the user)
    }
  };
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/TodosPage" title="Home">
          <FontAwesomeIcon icon={faHouseChimney} className="icon" />
        </Link>
        <Link href="/TodosPage/new" title="Create new task">
          <FontAwesomeIcon icon={faPlusSquare} className="icon" />
        </Link>
        <Link href="/Profile" title="Profile">
          <FontAwesomeIcon icon={faUser} className="icon" />
        </Link>
        <Link href="/Timetable" title="Timetable upload">
          <FontAwesomeIcon icon={faUpload} className="icon" />
        </Link>
        
      </div>
      <div>
        <Link href="/Login" title="Login">
          Login
        </Link>
        <div>
          <button onClick={logout}>Log Out</button>
        </div>
        
      </div>
    </nav>
  );
};

export default Nav;
