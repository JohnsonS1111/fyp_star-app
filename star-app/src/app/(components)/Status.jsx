import React from "react";

const Status = ({ status }) => {
  const getColor = (status) => {
    let color = "bg-slate-700";
    switch (status.toLowerCase()) {
      case "done":
        color = "bg-green-200";
        return color;
      case "started":
        color = "bg-yellow-200";
        return color;
      case "not started":
        color = "bg-red-200";
        return color;
      case "stuck":
        color = "bg-orange-300";
        return color;
    }
    return color;
  };
  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-bold text-black-500 bg-green-600`}
    >
      {status}
    </span>
  );
};

export default Status;
