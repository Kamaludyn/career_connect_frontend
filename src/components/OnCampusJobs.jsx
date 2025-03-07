import React from "react";

const OnCampusJobs = ({ campusJobs }) => {
  return (
    <section className="mt-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold">On-campus Trending Job Listings</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Find interesting jobs on campus
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {campusJobs.map((job, index) => (
          <div
            key={index}
            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <h4 className="text-md font-medium">
              <strong>{job.title}</strong>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              at {job.company} - {job.location}
            </p>
            <button
              className="text-blue-500 dark:text-blue-400 mt-2 block"
              onClick={() => navigate("/job-details")}
            >
              View Job
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OnCampusJobs;
