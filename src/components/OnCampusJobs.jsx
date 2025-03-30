import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import RecomContentPlaceholder from "./RecomContentPlaceholder";

const OnCampusJobs = () => {
  const { jobs } = useData();
  const navigate = useNavigate();

  // FIlters the jobs array to only include jobs available on-Campus
  const campusJobs = jobs.filter((job) => job.location === "On-Campus");

  return (
    <section className="mt-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold">On-campus Trending Job Listings</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Find interesting jobs on campus
      </p>
      {campusJobs.length === 0 ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <RecomContentPlaceholder key={index} />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {campusJobs.map((job) => (
            <div
              key={job._id}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <h4 className="text-md font-medium">
                <strong>{job.title}</strong>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                at {job.company} - {job.locationDetails}
              </p>
              <button
                className="text-blue-500 dark:text-blue-400 mt-2 block hover:underline"
                onClick={() =>
                  navigate(`/job-details/${job._id}`, { state: { job } })
                }
              >
                View Job
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OnCampusJobs;
