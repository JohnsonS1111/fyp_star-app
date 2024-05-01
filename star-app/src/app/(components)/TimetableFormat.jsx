"use client"
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const TimetableFormat = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(parsedData);
      setFile(uploadedFile);
    };
    reader.readAsBinaryString(uploadedFile);
  };

  const handleUpload = async () => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/timetable/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}` // Pass token with the request
        }
      });
      if (!res.ok) {
        alert("Upload failed");
      }
    } catch (error) {
      console.log("Upload failed due to ", error);
    }
  };

  return (
    <div>
      <form>
        <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
        <button
          onClick={handleUpload}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Upload Timetable
        </button>
      </form>

      {data.length > 0 && (
        <table className="table-auto">
          <thead>
            <tr>
              {data[0].map((header, index) => (
                <th key={index} className="px-4 py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((value, index) => (
                  <td key={index} className="border px-4 py-2">
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