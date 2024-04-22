"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const TimetableFormat = () => {
  const [data, setData] = useState([]);
  const handleFileUpload = (e) => {
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
  };
  return (
    <div className="container mx-auto py-4">
      <input
        type="file"
        accept=".xlsx, .xls"
        className="border border-gray-300 rounded p-2 mb-4"
        onChange={handleFileUpload}
      />
      {data.length > 0 && (
        <table className="table-auto">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="border border-gray-300 p-2">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index} className="border border-gray-300 p-2">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimetableFormat;
