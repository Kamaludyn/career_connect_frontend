import { useLocation, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function JobDetails() {
  const navigate = useNavigate();

  const location = useLocation();
  const { job } = location.state;

  const { applyForJob } = useData();

  const handleClick = () => {
    // Checks with the user before applying for job
    const confirmApplication = confirm(
      "Are you sure you want to apply for this Job"
    );

    if (!confirmApplication) return;

    applyForJob(job._id);
  };

  return (
    <div className="w-full flex flex-col items-center mx-auto p-6 bg-white dark:bg-darkBg dark:text-white rounded-lg shadow-md">
      <div className="self-start mb-3">
        <p
          className="w-fit py-2 px-4 border rounded-lg hover:bg-transparent bg-gray-300 dark:text-black dark:hover:bg-gray-700 hover:text-primary cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back
        </p>
      </div>
      <h1 className="text-2xl font-bold mb-4 underline">Job Details</h1>
      <h2 className="text-2xl dark:text-white text-gray-800 font-semibold mb-2">
        {job?.title}
      </h2>
      <p className="text-lg text-gray-600">{job?.company}</p>
      <p className="mt-2">{job?.description}</p>

      <div className="mt-4">
        <p>
          <strong>Location:</strong> {job?.location}
        </p>
        {job?.location !== "Remote" && (
          <p>
            <strong>Address:</strong> {job?.locationDetails}
          </p>
        )}
        <p>
          <strong>Type:</strong> {job?.type}
        </p>
        <p>
          <strong>Experience Level:</strong> {job?.experienceLevel}
        </p>
      </div>

      <div className="mt-4">
        <p>
          <strong>Salary:</strong> {job?.currency} {job?.minSalary} -{" "}
          {job?.maxSalary}
        </p>
      </div>

      <div className="mt-4">
        <p>
          <strong>Application Method:</strong> {job?.applicationMethod}
        </p>
        {job?.applicationMethod !== "careerconnect" ? (
          job?.applicationLink && (
            <p>
              <strong>Apply Here:</strong>{" "}
              <a
                href={job?.applicationLink}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {job?.applicationLink}
              </a>
            </p>
          )
        ) : (
          <button
            onClick={handleClick}
            className="w-full mx-auto mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}
