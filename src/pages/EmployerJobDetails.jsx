import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { BsChevronLeft } from "react-icons/bs";

export default function EmployerJobDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const [jobDetails, setJobDetails] = useState({});

  const { id } = useParams();

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

  // Function to handle the review of job applications (accept/reject).
  const handleReview = async (applicationId, status) => {
    const confirmStatus = confirm(
      `Are you sure you want to ${status} this application?`
    );
    if (!confirmStatus) return;
    try {
      const res = await api.put(`/applications/${applicationId}`, {
        status,
      });

      // Update UI
      setJobDetails((prev) => ({
        ...prev,
        applicants: prev.applicants.map((applicant) =>
          applicant._id === applicationId
            ? { ...applicant, status } 
            : applicant
        ),
      }));

      toast.success(res.data.message);
    } catch (error) {
      toast.error("Job Application Review Error");
    }
  };

  return (
    <div className="placeholder:w-full flex flex-col items-center mx-auto p-6 bg-white dark:bg-darkBg dark:text-white rounded-lg shadow-md">
      <div className="self-start mb-3">
        <p
          className="w-fit py-2 px-4 border rounded-lg hover:bg-transparent bg-gray-300 dark:hover:bg-gray-700 hover:text-primary cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <BsChevronLeft />
        </p>
      </div>
      <h2 className="text-3xl font-bold mb-4">{jobDetails?.title}</h2>
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
        {jobDetails?.applicationMethod !== "careerconnect" &&
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
          )}
      </div>
      <div className="flex flex-col">
        <strong className="self-center">Applications</strong>
        {jobDetails?.applicants?.map((applicant) => (
          <div
            key={applicant.applicant._id}
            className="flex flex-col md:flex-row justify-between items-center gap-2 mt-2 py-1.5 border-b border-gray-400"
          >
            <p
              onClick={() =>
                navigate(`/student-profile/${applicant.applicant._id}`)
              }
              className={`hover:underline cursor-pointer ${
                applicant.status === "rejected" ? "text-error" : "text-primary"
              }`}
            >
              {applicant.applicant.othername} {applicant.applicant.surname}
            </p>
            {applicant.status === "pending" ? (
              <div className="space-x-2">
                <button
                  className="px-3 py-1 bg-success border hover:border-success text-white hover:bg-white hover:text-success rounded"
                  onClick={() => handleReview(applicant._id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="px-3 py-1 border hover:border-error bg-error hover:bg-white hover:text-error text-white rounded"
                  onClick={() => handleReview(applicant._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            ) : (
              <>
                <p
                  className={`${
                    applicant.status === "rejected"
                      ? "text-error"
                      : "text-success"
                  } text-error px-3 py-1 italic`}
                >
                  {applicant.status.charAt(0).toUpperCase() +
                    applicant.status.slice(1).toLowerCase()}
                </p>
                {applicant.status === "accepted" && (
                  <button
                    className="italic px-3 py-1 bg-success border hover:border-success text-white hover:bg-white hover:text-success rounded"
                    onClick={() =>
                      navigate(`/messages/${applicant.applicant._id}`)
                    }
                  >
                    Send Message
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
