import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import api from "../services/api";
import { BsChevronLeft } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function JobDetails() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const [jobDetails, setJobDetails] = useState({});

  const { id } = useParams();

  const { applyForJob } = useData();

  // Effect to fetch selected job details
  useEffect(() => {
    // Check if there is any state passed through the navigation (location.state).
    if (!location.state) {
      // If no state is passed, fetch the job details manually using the job's ID from the URL.
      const fetchJob = async () => {
        try {
          const response = await api.get(`/jobs/${id}`);
          setJobDetails(response.data);
        } catch (error) {
          console.error("Error fetching job details");
        }
      };

      fetchJob();
    } else {
      // If state is passed from navigation, use that to avoid refetching from the server.
      const { job } = location.state;
      setJobDetails(job);
    }
  }, []);

  const handleClick = () => {
    //  Check if user is logged in before proceeding
    if (!user) {
      toast.error("Please login to Apply");
      return;
    }

    // Checks with the user before applying for job
    const confirmApplication = confirm(
      "Are you sure you want to apply for this Job"
    );

    if (!confirmApplication) return;

    applyForJob(jobDetails?._id);
  };

  return (
    <div className="w-full flex flex-col items-center mx-auto p-6 bg-white dark:bg-darkBg dark:text-white rounded-lg shadow-md">
      <div className="self-start mb-3">
        <p
          className="w-fit py-2 px-4 border rounded-lg hover:bg-transparent bg-gray-300 dark:text-black dark:hover:bg-gray-700 hover:text-primary cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <BsChevronLeft />
        </p>
      </div>
      <h1 className="text-2xl font-bold mb-4 underline">Job Details</h1>
      <h2 className="text-2xl dark:text-white text-gray-800 font-semibold mb-2">
        {jobDetails?.title}
      </h2>
      <p className="text-lg text-gray-600">{jobDetails?.company}</p>
      <p className="mt-2">{jobDetails?.description}</p>

      <div className="mt-4">
        <p>
          <strong>Location:</strong> {jobDetails?.location}
        </p>
        {jobDetails?.location !== "Remote" && (
          <p>
            <strong>Address:</strong> {jobDetails?.locationDetails}
          </p>
        )}
        <p>
          <strong>Type:</strong> {jobDetails?.type}
        </p>
        <p>
          <strong>Experience Level:</strong> {jobDetails?.experienceLevel}
        </p>
      </div>

      <div className="mt-4">
        <p>
          <strong>Salary:</strong> {jobDetails?.currency}{" "}
          {jobDetails?.minSalary} - {jobDetails?.maxSalary}
        </p>
      </div>

      <div className="mt-4">
        <p>
          <strong>Application Method:</strong> {jobDetails?.applicationMethod}
        </p>
        {jobDetails?.applicationMethod !== "careerconnect" ? (
          jobDetails?.applicationLink && (
            <p>
              <strong>Apply Here:</strong>{" "}
              <a
                href={jobDetails?.applicationLink}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {jobDetails?.applicationLink}
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
