import React, { useState } from "react";

const SkillDev = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const skills = [
    {
      title: "React for Beginners",
      category: "Web Development",
      level: "Beginner",
      link: "#",
    },
    {
      title: "Advanced JavaScript",
      category: "Programming",
      level: "Advanced",
      link: "#",
    },
    {
      title: "Data Analysis with Python",
      category: "Data Science",
      level: "Intermediate",
      link: "#",
    },
  ];

  const filteredSkills = skills.filter(
    (skill) =>
      (categoryFilter ? skill.category === categoryFilter : true) &&
      (searchQuery
        ? skill.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl">
      {/* Header Section */}
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold">Skill Development</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn new skills to advance your career
        </p>
        <input
          type="text"
          placeholder="Search courses..."
          className="mt-4 p-2 w-full max-w-lg rounded-lg shadow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      {/* Filters */}
      <section className="mb-6">
        <select
          className="p-2 rounded-lg"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Web Development">Web Development</option>
          <option value="Programming">Programming</option>
          <option value="Data Science">Data Science</option>
        </select>
      </section>

      {/* Skill Listings */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">{skill.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Category: {skill.category}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Level: {skill.level}
            </p>
            <a
              href={skill.link}
              className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Start Learning
            </a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SkillDev;
