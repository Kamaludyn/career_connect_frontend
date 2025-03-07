import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    jobType: "",
    industry: "",
    experience: "",
    location: "",
  });

  const navigate = useNavigate();

  const jobs = [
    {
      title: "Software Engineer",
      company: "Tech Corp",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000/yr",
      onCampus: false,
    },
    {
      title: "Marketing Manager",
      company: "Biz Group",
      location: "New York, NY",
      type: "Part-time",
      salary: "$50,000/yr",
      onCampus: true,
    },
    {
      title: "Data Scientist",
      company: "Data Solutions",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000/yr",
      onCampus: false,
    },
    {
      title: "Graphic Designer",
      company: "Creative Inc",
      location: "Los Angeles, CA",
      type: "Contract",
      salary: "$70,000/yr",
      onCampus: true,
    },
    {
      title: "Product Manager",
      company: "Innovatech",
      location: "Remote",
      type: "Full-time",
      salary: "$110,000/yr",
      onCampus: false,
    },
    {
      title: "Sales Associate",
      company: "Retail Corp",
      location: "Chicago, IL",
      type: "Part-time",
      salary: "$40,000/yr",
      onCampus: true,
    },
    {
      title: "HR Specialist",
      company: "People First",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$60,000/yr",
      onCampus: false,
    },
    {
      title: "Business Analyst",
      company: "Biz Analytics",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$90,000/yr",
      onCampus: true,
    },
    {
      title: "Customer Support",
      company: "Support Hub",
      location: "Remote",
      type: "Full-time",
      salary: "$50,000/yr",
      onCampus: false,
    },
    {
      title: "UX/UI Designer",
      company: "Design Studio",
      location: "Seattle, WA",
      type: "Contract",
      salary: "$85,000/yr",
      onCampus: true,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl">
      {/* Header Section */}
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold">Explore Job Opportunities</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Find jobs that match your skills and interests
        </p>
        <input
          type="text"
          placeholder="Search by job title, company, or keyword..."
          className="mt-4 p-2 w-full max-w-lg rounded-lg shadow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      {/* Filters */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6 text-primary">
        <select
          className="p-2 rounded-lg"
          onChange={(e) => setFilter({ ...filter, jobType: e.target.value })}
        >
          <option value="">Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>
        <select
          className="p-2 rounded-lg"
          onChange={(e) => setFilter({ ...filter, industry: e.target.value })}
        >
          <option value="">Industry</option>
          <option value="Tech">Tech</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>
        <select
          className="p-2 rounded-lg"
          onChange={(e) => setFilter({ ...filter, experience: e.target.value })}
        >
          <option value="">Experience Level</option>
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
        <select
          className="p-2 rounded-lg"
          onChange={(e) => setFilter({ ...filter, onCampus: e.target.value })}
        >
          <option value="">Location</option>
          <option value="On-Campus">On-Campus</option>
          <option value="Off-Campus">Off-Campus</option>
        </select>
      </section>

      {/* Job Listings */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer"
            onClick={() => navigate("/job-details")}
          >
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {job.company} - {job.location}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {job.type} - {job.salary}
            </p>
            <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              Apply Now
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Jobs;
