import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";
import EmployerJobDetails from "./EmployerJobDetails";

const EmployerPostedJobs = ({ setActiveTab, setSelectedJob }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myJobs, setMyJobs] = useState([]);
  const [myJob, setMyJob] = useState(null);

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

  // Function to handle editing a job
  const handleEdit = (jobId) => {
    // Find the selected job from the list of jobs
    const mySelectedJob = myJobs.find((job) => job._id === jobId);

    // Set the active tab to "Post Job" for editing
    setActiveTab("Post Job");

    // Pass the selected job to the parent component for editing
    setSelectedJob(mySelectedJob);
  };

  // Function to handle viewing job details
  const handleJobView = (jobId) => {
    setIsOpen(true);
    // Find the selected job
    const mySelectedJob = myJobs.find((job) => job._id === jobId);

    // Update the state with the selected job
    setMyJob(mySelectedJob);
  };
  return (
    <>
      <div id="your-jobs" className={`w-full ${isOpen ? "hidden" : "block"}`}>
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
        ) : (
          <ul className="w-full p-4 bg-lightBg dark:bg-gray-800 rounded-2xl ">
            {myJobs.map((job) => (
              <React.Fragment key={job._id}>
                <li className="flex justify-between p-2 mt-2 rounded-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500">
                  <div className="dark:text-darkText">
                    <p
                      className="font-semibold hover:underline hover:text-gray-700"
                      onClick={() => handleJobView(job._id)}
                    >
                      {job.title}
                    </p>
                    <p>{job.applicants.length} Applicantions</p>
                  </div>
                  <div className="my-auto">
                    <button
                      onClick={() => handleEdit(job._id)}
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
      </div>
      <EmployerJobDetails
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        myJob={myJob}
        setMyJob={setMyJob}
      />
    </>
  );
};

export default EmployerPostedJobs;
