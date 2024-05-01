"use client";
import {
  faHouseChimney,
  faListCheck,
  faPlusSquare,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Nav = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/logout/", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        console.log("Logged out");
      }
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/");
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
          <button
            onClick={logout}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
