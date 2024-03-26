import React from "react";
import TodoCard from "./(components)/TodoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <div className="p-5">
      <div className="lg:grid grid-cols-2 xl:grid-cols-4">
        <TodoCard/>
      <TodoCard/>
      <TodoCard/>
      <TodoCard/>
      </div>
      
    </div>
  );
};

export default Dashboard;
