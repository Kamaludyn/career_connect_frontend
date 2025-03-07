import React from "react";
import { Link } from "react-router-dom";
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
const EmployerPostedJobs = () => {
  return (
    <div id="your-jobs" className="w-full">
      <ul className="w-full p-4 bg-lightBg dark:bg-gray-800 rounded-2xl ">
        {jobs.map((job) => (
          <>
            <li
              key={job.id}
              className="flex justify-between p-2 mt-2 rounded-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500"
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
            <hr></hr>
          </>
        ))}
      </ul>
    </div>
  );
};

export default EmployerPostedJobs;
