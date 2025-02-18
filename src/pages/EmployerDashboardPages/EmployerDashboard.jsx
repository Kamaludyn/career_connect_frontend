import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmployerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const jobs = [
    { id: 1, title: "Software Engineer", applicants: 12 },
    { id: 2, title: "Product Manager", applicants: 8 },
    { id: 3, title: "Data Scientist", applicants: 5 },
    { id: 4, title: "Product Manager", applicants: 8 },
    { id: 5, title: "Data Scientist", applicants: 5 },
    { id: 6, title: "Product Manager", applicants: 8 },
    { id: 7, title: "Data Scientist", applicants: 5 },
    { id: 8, title: "Product Manager", applicants: 8 },
    { id: 9, title: "Data Scientist", applicants: 5 },
  ];

  const students = [
    { id: 1, name: "Alice Johnson", skills: "React, Node.js" },
    { id: 2, name: "Bob Smith", skills: "Python, Machine Learning" },
    { id: 3, name: "Charlie Lee", skills: "UI/UX, Figma" },
  ];

  return (
    <div className="p-4 pt-16 relative">
      <nav className="absolute top-0 inset-x-4 flex justify-between md:justify-start gap-2 md:gap-4 p-2 border-b bg-white dark:bg-gray-800 shadow rounded-t-xl">
        <a
          href="#your-jobs"
          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary"
        >
          Your Jobs
        </a>
        <a
          href="#recruit-students"
          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary"
        >
          Recruit Students
        </a>
      </nav>
      {/* <h2 className="text-2xl font-bold">Employer Dashboard</h2> */}

      {/* Job Listings */}
      <div id="your-jobs" className="mt-4 w-full">
        <h3 className="text-lg ml-2 font-semibold dark:text-darkText">
          Your Jobs
        </h3>
        <ul className="w-full mt-2 bg-lightBg dark:bg-gray-800">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="flex justify-between border-b p-2 shadow cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              <div className="dark:text-darkText">
                <p className="font-semibold ">{job.title}</p>
                <p>{job.applicants} Applicants</p>
              </div>
              <div className="my-auto">
                <Link to="/edit-job/1" className="text-blue-500 mr-3">
                  Edit
                </Link>
                <button className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* <li className="flex justify-between border-b py-2 dark:border-gray-700">
//               <span className="dark:text-white">Frontend Developer</span>
//               <div>
//                 <Link to="/edit-job/1" className="text-blue-500 mr-3">
//                   Edit
//                 </Link>
//                 <button className="text-red-500">Delete</button>
//               </div>
//             </li> */}
      {/* Student Search and Filters */}
      <div id="recruit-students" className="mt-6">
        <h3 className="text-lg ml-2 font-semibold dark:text-darkText">
          Recruit Students for your company{" "}
        </h3>
        <input
          type="text"
          placeholder="Search by name or skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full mt-2"
        />

        <select
          className="p-2 border rounded w-full mt-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Skills</option>
          <option value="React">React</option>
          <option value="Python">Python</option>
          <option value="UI/UX">UI/UX</option>
        </select>

        <ul className="mt-2 dark:text-darkText">
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
              <li
                key={student.id}
                className="md:flex justify-between p-2 bg-white dark:bg-gray-800 rounded shadow mb-2"
              >
                <p>
                  {student.name} - Skills: {student.skills}
                </p>
                <Link to="/candidate/1" className="text-blue-500">
                  View Profile{" "}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployerDashboard;
// import React from "react";

// import { Link } from "react-router-dom";

// const EmployerDashboard = () => {
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900">
//       <h1 className="text-2xl font-bold mb-4 dark:text-white">
//         Employer Dashboard
//       </h1>

//       {/* Job Management Section */}
//       <div className="mb-6">
//         <h2 className="text-xl font-bold mb-2 dark:text-white">
//           Your Job Posts
//         </h2>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
//           <ul>
//             <li className="flex justify-between border-b py-2 dark:border-gray-700">
//               <span className="dark:text-white">Frontend Developer</span>
//               <div>
//                 <Link to="/edit-job/1" className="text-blue-500 mr-3">
//                   Edit
//                 </Link>
//                 <button className="text-red-500">Delete</button>
//               </div>
//             </li>
//             <li className="flex justify-between border-b py-2 dark:border-gray-700">
//               <span className="dark:text-white">Marketing Manager</span>
//               <div>
//                 <Link to="/edit-job/2" className="text-blue-500 mr-3">
//                   Edit
//                 </Link>
//                 <button className="text-red-500">Delete</button>
//               </div>
//             </li>
//           </ul>
//           <Link to="/post-job" className="text-green-600 mt-2 block">
//             + Post a New Job
//           </Link>
//         </div>
//       </div>

//       {/* Candidates Section */}
//       <div className="mb-6">
//         <h2 className="text-xl font-bold mb-2 dark:text-white">
//           Suggested Candidates
//         </h2>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
//           <ul>
//             <li className="flex justify-between border-b py-2 dark:border-gray-700">
//               <span className="dark:text-white">John Doe - UI/UX Designer</span>
//               <Link to="/candidate/1" className="text-blue-500">
//                 View Profile
//               </Link>
//             </li>
//             <li className="flex justify-between border-b py-2 dark:border-gray-700">
//               <span className="dark:text-white">
//                 Jane Smith - Software Engineer
//               </span>
//               <Link to="/candidate/2" className="text-blue-500">
//                 View Profile
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployerDashboard;
