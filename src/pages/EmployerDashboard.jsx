import React, { useState } from "react";
import EmployerPostedJobs from "./EmployerPostedJobs";
import Applicants from "./Applicants";
import PostJobForm from "./PostJobForm";

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Your Jobs");
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <section className="pt-16 md:pt-20 md:p-4 relative">
      <nav className="absolute top-0 md:inset-x-4 w-full flex justify-between md:justify-start md:gap-4 py-2  md:p-2 text-sm border-b border-lightBorder">
        <button
          className={`md:px-4 py-2 font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ${
            activeTab === "Your Jobs"
              ? "text-primary"
              : "text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("Your Jobs")}
        >
          Your Jobs
        </button>
        <button
          className={`md:px-4 py-2 font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ${
            activeTab === "Recruit Applicants"
              ? "text-primary"
              : "text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("Recruit Applicants")}
        >
          Recruit Applicants
        </button>
        <button
          className={`md:px-4 py-2 font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ${
            activeTab === "Post Job"
              ? "text-primary"
              : "text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("Post Job")}
        >
          Post New Job
        </button>
      </nav>

      {activeTab === "Your Jobs" && (
        <EmployerPostedJobs
          setActiveTab={setActiveTab}
          setSelectedJob={setSelectedJob}
        />
      )}
      {activeTab === "Recruit Applicants" && <Applicants />}
      {activeTab === "Post Job" && <PostJobForm selectedJob={selectedJob} />}
    </section>
  );
};

export default EmployerDashboard;
