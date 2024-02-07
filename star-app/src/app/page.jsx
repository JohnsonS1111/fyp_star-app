import React from "react";
import TodoCard from "./(components)/TodoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faPenRuler} className="icon2" />
        Upcoming Tasks
      </h2>{" "}
      <TodoCard />
    </div>
  );
};

export default Dashboard;
