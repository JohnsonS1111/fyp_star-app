"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";

const Table = ({parsedData}) => {
  const [data, setData] = useState([]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };

    const res = await fetch("api/Timetable", {
      method: "saveToDb",
      body: JSON.stringify({ parsedData }),
      "content-type": "application/json",
    });
    if (!res.ok) {
      throw new Error("Unable to create task.");
    }

    router.refresh();
    router.push("/");
  };
  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {data.length > 0 && (
        <table className="table border border-black w-full px-4 py-2 text-left">
          <thead>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
