import React from "react";

const JobDetail = () => {
  const job = {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Innovators Inc.",
    location: "Remote",
    salary: "$80,000 - $100,000 per year",
    description:
      "We are looking for a skilled Frontend Developer to join our team.",
    requirements: [
      "3+ years of experience in frontend development",
      "Proficiency in React and JavaScript",
      "Experience with responsive design and UI/UX principles",
    ],
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        {job.company} - {job.location}
      </p>
      <p className="text-md text-gray-500 dark:text-gray-400 mt-2">
        {job.salary}
      </p>
      <h2 className="text-xl font-semibold mt-4">Job Description</h2>
      <p className="text-md text-gray-700 dark:text-gray-300 mt-2">
        {job.description}
      </p>
      <h2 className="text-xl font-semibold mt-4">Requirements</h2>
      <ul className="list-disc ml-5 mt-2">
        {job.requirements.map((req, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            {req}
          </li>
        ))}
      </ul>
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Apply Now
      </button>
    </div>
  );
};

export default JobDetail;
