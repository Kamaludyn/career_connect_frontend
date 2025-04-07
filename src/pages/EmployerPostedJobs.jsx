import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-hot-toast";

const EmployerPostedJobs = () => {
  const [loading, setLoading] = useState(false);
  const [myJobs, setMyJobs] = useState([]);

  const navigate = useNavigate();

  // useEffect to fetch the employer's posted jobs when the component mounts
  useEffect(() => {
    const fetchMyJobs = async () => {
      setLoading(true);
      try {
        // Fetch the employer's jobs from the API
        const response = await api.get("/jobs/my-jobs");
        setMyJobs(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Unauthorized");
        } else {
          console.error("Error fetching employer jobs");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  // Function to delete a job
  const deleteJob = async (id) => {
    // Confirm with the user before deleting the job
    const confirmDelete = confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      // Send a DELETE request to the API to delete the job
      const response = await api.delete(`/jobs/${id}`);
      toast.success(response.data.message);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Job not found");
      } else if (error.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("An Error occured");
      }
    }
  };

  return (
    <section id="your-jobs" className="w-full">
      {loading ? (
        <ul className="w-full p-4 bg-lightBg dark:bg-gray-800 rounded-2xl ">
          {[...Array(5)].map((_, index) => (
            <li
              key={index}
              className="flex justify-between p-2 mt-2 rounded-md animate-pulse bg-gray-200 dark:bg-gray-700"
            >
              <div className="dark:text-darkText">
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-3 w-20 mt-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
              <div className="my-auto flex space-x-3">
                <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </li>
          ))}
        </ul>
      ) : myJobs?.length === 0 ? (
        <div className="flex flex-col md:flex-row items-center gap-3 p-4 mt-2 md:p-4 dark:text-white bg-lightBg dark:bg-gray-800 rounded-2xl">
          <p>You have not uploaded any Job</p>
          <button
            className="text-secondary hover:text-primary hover:underline"
            onClick={() => navigate("/employer-dashboard/job-form")}
          >
            Upload Here!
          </button>
        </div>
      ) : (
        <ul className="w-full p-4 bg-lightBg dark:bg-gray-800 rounded-2xl ">
          {myJobs.map((job) => (
            <React.Fragment key={job._id}>
              <li className="flex justify-between p-2 mt-2 rounded-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500">
                <div className="dark:text-darkText">
                  <p
                    className="font-semibold hover:underline hover:text-gray-700"
                    onClick={() =>
                      navigate(`/employer-dashboard/job-details/${job._id}`, {
                        state: { job },
                      })
                    }
                  >
                    {job.title}
                  </p>
                  <p>{job.applicants.length} Applicantions</p>
                </div>
                <div className="my-auto">
                  <button
                    onClick={() =>
                      navigate("/employer-dashboard/job-form", {
                        state: { job },
                      })
                    }
                    className=" mr-3 text-blue-500 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteJob(job._id)}
                    className="text-red-500 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </li>
              <hr></hr>
            </React.Fragment>
          ))}
        </ul>
      )}
    </section>
  );
};

export default EmployerPostedJobs;
