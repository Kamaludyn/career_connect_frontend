import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const resources = [
    {
      title: "Resume Writing Tips",
      category: "Resume",
      description: "Learn how to craft a compelling resume.",
      link: "#",
    },
    {
      title: "Ace Your Next Interview",
      category: "Interview",
      description: "Top strategies for interview success.",
      link: "#",
    },
    {
      title: "Salary Negotiation Guide",
      category: "Career Growth",
      description: "How to negotiate your salary confidently.",
      link: "#",
    },
  ];

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (category === "" || resource.category === category)
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl">
      {/* Header Section */}
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold">Career Resources</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explore guides, articles, and templates to boost your career
        </p>
        <input
          type="text"
          placeholder="Search resources..."
          className="mt-4 p-2 w-full max-w-lg rounded-lg shadow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      {/* Category Filters */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-6 text-primary">
        <select
          className="p-2 rounded-lg"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Resume">Resume Writing</option>
          <option value="Interview">Interview Tips</option>
          <option value="Career Growth">Career Growth</option>
        </select>
      </section>

      {/* Resource Listings */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">{resource.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {resource.description}
            </p>
            <button
              className="mt-2 inline-block text-blue-600"
              onClick={() => navigate("/resource-details")}
            >
              Read More
            </button>
            {/* <a href={resource.link} className="mt-2 inline-block text-blue-600">
              Read More
            </a> */}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Resources;
