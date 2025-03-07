import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
const students = [
  { id: 1, name: "Alice Johnson", skills: "React, Node.js" },
  { id: 2, name: "Bob Smith", skills: "Python, Machine Learning" },
  { id: 3, name: "Charlie Lee", skills: "UI/UX, Figma" },
];
const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  return (
    <div id="recruit-students" className="">
      <h3 className="text-lg ml-2 font-semibold dark:text-darkText">
        Recruit Students for your company{" "}
      </h3>
      <input
        type="text"
        placeholder="Search by name or skill..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border w-full mt-2 rounded-2xl"
      />

      <select
        className="p-2 border rounded-2xl w-full mt-2"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All Skills</option>
        <option value="React">React</option>
        <option value="Python">Python</option>
        <option value="UI/UX">UI/UX</option>
      </select>

      <ul
            className="mt-2 p-2 md:p-4 space-y-3 bg-lightBg dark:bg-gray-800 rounded-2xl"
      >
        {students
          .filter(
            (student) =>
              student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              student.skills.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((student) =>
            filter ? student.skills.includes(filter) : true
          )
          .map((student) => (
            <>
            <li
              key={student.id}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md"
            >
              <BsPersonCircle className="h-12 w-12 mr-3 rounded-full text-lightText dark:text-darkText" />

              <div>
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.skills}</p>
                </div>
                <Link to="/candidate/1" className="text-blue-500 md:mr-3">
                  View Profile
                </Link>
              </div>
            </li>
            <hr></hr>
            </>
          ))}
      </ul>
    </div>
  );
};

export default Students;