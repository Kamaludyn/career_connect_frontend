import React, { useState } from "react";

const MentorshipPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    industry: "",
    experience: "",
    availability: "",
  });

  const mentors = [
    {
      name: "John Doe",
      industry: "Tech",
      experience: "5+ years",
      available: true,
      rating: 4.8,
    },
    {
      name: "Jane Smith",
      industry: "Finance",
      experience: "10+ years",
      available: false,
      rating: 4.5,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl">
      {/* Header Section */}
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold">Find a Mentor</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Connect with industry experts to guide your career journey
        </p>
        <input
          type="text"
          placeholder="Search by name, industry, or expertise..."
          className="mt-4 p-2 w-full max-w-lg rounded-lg shadow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      {/* Filters */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-6 text-primary">
        <select
          className="p-2 rounded-lg"
          onChange={(e) => setFilter({ ...filter, industry: e.target.value })}
        >
          <option value="">Select Industry</option>
          <option value="Tech">Tech</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
        </select>
        <select
          className="p-2 rounded-lg"
          onChange={(e) => setFilter({ ...filter, experience: e.target.value })}
        >
          <option value="">Experience Level</option>
          <option value="5+ years">5+ years</option>
          <option value="10+ years">10+ years</option>
        </select>
        <select
          className="p-2 rounded-lg"
          onChange={(e) =>
            setFilter({ ...filter, availability: e.target.value })
          }
        >
          <option value="">Availability</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </section>

      {/* Mentor Listings */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">{mentor.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {mentor.industry} - {mentor.experience}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Rating: ⭐{mentor.rating}
            </p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
              Request Mentorship
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MentorshipPage;
