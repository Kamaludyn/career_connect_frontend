import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import PlaceholderCards from "../components/PlaceholderCards";
import JobApplicationModal from "../components/JobApplicationModal";
import ClipLoader from "react-spinners/ClipLoader";

const Jobs = () => {
  const [redirect, setRedirect] = useState(false);
  const [applicationLink, setsetApplicationLink] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    jobType: "",
    experience: "",
    location: "",
  });

  const navigate = useNavigate();
  const { jobs, applyForJob } = useData();

  // Function to handle changes in the filter dropdowns
  const handleFilterChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,// Update the specific filter based on the dropdown name
    }));
  };

   // Filter the jobs based on the search query and selected filters
  const filteredJobs = jobs?.filter((job) => {
     // Check if the job title or company matches the search query
    const searchJobs =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

   // Check if the job type matches the selected filter
   const filterJobType = filter.jobType === "" || job.type === filter.jobType;

   // Check if the experience level matches the selected filter
   const filterJobExperience =
     filter.experience === "" || job.experienceLevel === filter.experience;

   // Check if the location matches the selected filter
   const filterJobLocation =
     filter.location === "" || job.location === filter.location;

   // Return true if the job matches all the conditions
    return (
      searchJobs && filterJobType && filterJobExperience && filterJobLocation
    );
  });

  // Function to handle the "Apply Now" button click
  const handleClick = async (job) => {
    // Confirm with the user before applying for the job
    const confirmApplication = confirm(
      "Are you sure you want to apply for this Job"
    );

    if (!confirmApplication) return;

    // Check if application method is not on site
    if (job.applicationMethod !== "careerconnect") {
      setsetApplicationLink(job.applicationLink);
      setRedirect(true);
    } else {
      setLoading(true)
      const success = await  applyForJob(job._id);
      if(success){
         setLoading(false)
      } else{
        toast.error("Job Applicantions Failed")
      }
    }
  };

  return (
    <>
      <section className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl">
        <section className="text-center mb-6">
          <h1 className="text-3xl font-bold">Explore Job Opportunities</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find jobs that match your skills and interests
          </p>
          <input
            type="text"
            placeholder="Search by job title, company, or keyword..."
            className="mt-4 p-2 w-full max-w-lg rounded-lg shadow dark:text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6 text-primary">
          <select
            name="jobType"
            className="p-2 rounded-lg"
            onChange={handleFilterChange}
          >
            <option value="">Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
          <select
            name="experience"
            className="p-2 rounded-lg"
            onChange={handleFilterChange}
          >
            <option value="">Experience Level</option>
            <option value="Entry">Entry</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Senior">Senior</option>
          </select>
          <select
            name="location"
            className="p-2 rounded-lg"
            onChange={handleFilterChange}
          >
            <option value="">Location</option>
            <option value="On-Campus">On-Campus</option>
            <option value="Off-Campus">Off-Campus</option>
            <option value="Remote">Remote</option>
          </select>
        </section>

        {filteredJobs.length === 0 ? (
          <PlaceholderCards />
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs?.map((job) => (
              <div
                key={job._id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow "
              >
                <h3
                  className="text-lg font-semibold cursor-pointer hover:text-primary active:text-primary hover:underline"
                  onClick={() =>
                    navigate(`/job-details/${job._id}`, { state: { job } })
                  }
                >
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {job.company} -{" "}
                  {job.locationDetails ? job.locationDetails : job.location}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Experience Level: {job.experienceLevel}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {job.type}: {job.currency}
                  {job.minSalary} - {job.currency}
                  {job.maxSalary}
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  onClick={() => handleClick(job)}
                  disabled={loading}
                >
                  {loading ? <ClipLoader color="#ffffff" size={18} /> : "Apply Now"}
                  
                </button>
              </div>
            ))}
          </section>
        )}
      </section>
      {redirect && (
        // Modal for redirecting to the application link
        <JobApplicationModal
          setRedirect={setRedirect}
          applicationLink={applicationLink}
        />
      )}
    </>
  );
};

export default Jobs;
