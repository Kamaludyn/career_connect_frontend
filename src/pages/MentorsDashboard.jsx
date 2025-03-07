import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenteesList from "./MenteesList";
import MentorshipRequests from "./MentorshipRequests";
import MentorResources from "./MentorResources";

const MentorsDashboard = () => {
  const [activeTab, setActiveTab] = useState("mentees");

  return (
    <div className="pt-16 md:pt-14 md:p-4 relative">
      {/* Navigation Tabs */}
      <nav className="absolute top-0 md:inset-x-4 w-full flex justify-between md:justify-start md:gap-4 py-2  md:p-2 text-sm border-b border-lightBorder">
        <button
          className={`md:px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ${
            activeTab === "mentees"
              ? "text-primary"
              : "text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("mentees")}
        >
          Mentees
        </button>
        <button
          className={`md:px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ${
            activeTab === "requests"
              ? "text-primary"
              : "text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Mentorship Requests
        </button>
        <button
          className={`md:px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ${
            activeTab === "resources"
              ? "text-primary"
              : "text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setActiveTab("resources")}
        >
          Resources
        </button>
      </nav>

      {/* Mentees List Section */}
      {activeTab === "mentees" && <MenteesList />}

      {/* Mentorship Requests Section */}
      {activeTab === "requests" && <MentorshipRequests />}

      {/* Resources Section */}
      {activeTab === "resources" && <MentorResources />}
    </div>
  );
};

export default MentorsDashboard;
