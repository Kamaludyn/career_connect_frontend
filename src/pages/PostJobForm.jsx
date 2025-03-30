import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
const experienceLevels = ["Entry", "Intermediate", "Mid-level", "Senior"];
const currencies = ["NGN", "USD", "EUR", "GBP"];
const locations = ["On-Campus", "Off-Campus", "Remote"];

export default function JobForm({ selectedJob }) {
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    description: "",
    location: "Remote",
    locationDetails: "",
    type: "",
    experienceLevel: "",
    minSalary: "",
    maxSalary: "",
    currency: "NGN",
    applicationMethod: "careerconnect",
    applicationLink: "",
  });
  
  // Reference for the form to allow resetting after submission
  const formRef = useRef(null);

  // useEffect to check if a job is selected on mount
  useEffect(() => {
     // If a job is selected, update the jobData state with the selected job details
    if (selectedJob) setJobData(selectedJob);

    // Resets jobData when the component unmounts
    return () => {
      setJobData(null);
    };
  }, []);

  // Function to handle input changes in the form fields
  const handleInputChange = (e) => {

    // Extract name and value from the input field
    const { name, value } = e.target;

    // Update the jobData state with the new value for the corresponding field
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission for adding or updating a job
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
       // If a job is selected, send a PUT request to update the job details
      if (selectedJob) {
        const response = await api.put(`/jobs/${selectedJob?._id}`, jobData);

         // Show success notification for job update
        toast.success("Job Updated Successfully");

          // Reset the form after successful submission
        formRef.current.reset();
      } else {
         // If no job is selected, send a POST request to add a new job
        const response = await api.post("/jobs", jobData);

         // Show success notification for job addition
         toast.success("Job Added Successfully");

         // Reset the form after successful submission
         formRef.current.reset();
      }
    } catch (error) {
       // Handle specific error responses based on status codes
      if (error.response?.status === 401) {
         // Unauthorized error
        toast.error(error.response.data.message);
      } else if (error.response?.status === 400) {
        // Bad request error
        toast.error(error.response.data.message);
      } else {
         // Catch-all for any other errors
        toast.error("An Error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4 p-6 bg-white dark:bg-darkBg rounded-lg shadow-md dark:text-darkText"
    >
      <h2 className="text-2xl font-bold ">Post a Job</h2>

      <label>Job Title</label>
      <input
        name="title"
        required
        className="dark:text-lightText p-2 border border-gray-300 rounded"
        value={jobData?.title || ""}
        onChange={handleInputChange}
      />

      <label>Company Name</label>
      <input
        name="company"
        required
        className="dark:text-lightText p-2 border border-gray-300 rounded"
        value={jobData?.company || ""}
        onChange={handleInputChange}
      />

      <label>Job Description</label>
      <textarea
        name="description"
        required
        className="dark:text-lightText p-2 border border-gray-300 rounded"
        value={jobData?.description || ""}
        onChange={handleInputChange}
      />

      <label>Location</label>
      <select
        name="location"
        value={jobData?.location}
        onChange={handleInputChange}
        className="dark:text-lightText p-2 border border-gray-300 rounded"
        required
      >
        <option value="">Select Location</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {jobData?.location !== "Remote" && (
        <>
          <label>Location Address</label>
          <input
            name="locationDetails"
            className="p-2 border border-gray-300 rounded dark:text-lightText"
            value={jobData?.locationDetails || ""}
            onChange={handleInputChange}
            required={jobData?.location !== "Remote"}
          />
        </>
      )}
      <label>Job Type</label>
      <select
        name="type"
        className="dark:text-lightText p-2 border border-gray-300 rounded"
        value={jobData?.type || ""}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Job Type</option>
        {jobTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label>Experience Level</label>
      <select
        name="experienceLevel"
        className="dark:text-lightText p-2 border border-gray-300 rounded"
        value={jobData?.experienceLevel || ""}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Experience Level</option>
        {experienceLevels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <label>Salary Range</label>
      <div className="flex justify-between gap-2 md:gap-4">
        <input
          name="minSalary"
          type="number"
          placeholder="Min"
          className="w-1/2 p-2 border border-gray-300 rounded dark:text-lightText"
          value={jobData?.minSalary || ""}
          onChange={handleInputChange}
          required
        />
        <input
          name="maxSalary"
          type="number"
          placeholder="Max"
          className="w-1/2 p-2 border border-gray-300 rounded dark:text-lightText"
          value={jobData?.maxSalary || ""}
          onChange={handleInputChange}
          required
        />
        <select
          name="currency"
          className="w-1/3 p-2 border border-gray-300 rounded dark:text-lightText"
          value={jobData?.currency || ""}
          onChange={handleInputChange}
          required
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <label>Application Method</label>
      <select
        name="applicationMethod"
        onChange={handleInputChange}
        className="dark:text-lightText p-2 border border-gray-300 rounded"
        required
      >
        <option value="careerconnect">Apply on CareerConnect</option>
        <option value="External-Link">External Link</option>
        <option value="Email">Email</option>
      </select>
      {jobData?.applicationMethod !== "careerconnect" && (
        <>
          <label>Application Link or Email</label>
          <input
            name="applicationLink"
            value={jobData?.applicationLink}
            onChange={handleInputChange}
            className="dark:text-lightText p-2 border border-gray-300 rounded"
            required={jobData?.location !== "careerconnect"}
          />
        </>
      )}

      <button
        type="submit"
        className={`p-3 bg-blue-600 text-white rounded hover:bg-blue-700 ${
          loading && "cursor-not-allowed"
        }`}
        disabled={loading}
      >
        {loading ? (
          <ClipLoader color="#ffffff" size={18} className="m-[-3px]" />
        ) : selectedJob ? (
          "Update Job"
        ) : (
          "Post Job"
        )}
      </button>
    </form>
  );
}
