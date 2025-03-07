import React from "react";

const OffCampusJobs = ({ offCampusJobs }) => {
  return (
    <section className="mt-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg  font-semibold">
        Trending Off campus Job Listings
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Find jobs tailored to your skills off campus
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {offCampusJobs.map((job, index) => (
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default OffCampusJobs;
