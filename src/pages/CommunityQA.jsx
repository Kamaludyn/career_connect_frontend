import React, { useState } from "react";

const CommunityQA = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How do I prepare for a technical interview?",
      category: "Interview Tips",
      votes: 12,
      answers: 5,
    },
    {
      id: 2,
      title: "What are the best strategies for writing a resume?",
      category: "Resume Help",
      votes: 8,
      answers: 3,
    },
    {
      id: 3,
      title: "How can I transition into data science?",
      category: "Career Advice",
      votes: 15,
      answers: 7,
    },
  ]);

  const filteredQuestions = questions.filter(
    (q) =>
      (categoryFilter ? q.category === categoryFilter : true) &&
      (searchQuery
        ? q.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl">
      {/* Header Section */}
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold">Community Q&A</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Ask questions and get answers from professionals
        </p>
        <input
          type="text"
          placeholder="Search questions..."
          className="mt-4 p-2 w-full max-w-lg rounded-lg shadow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      {/* Filters */}
      <section className="mb-6 flex gap-4 justify-center">
        <select
          className="p-2 rounded-lg"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Interview Tips">Interview Tips</option>
          <option value="Resume Help">Resume Help</option>
          <option value="Career Advice">Career Advice</option>
        </select>
      </section>

      {/* Ask Question Button */}
      <div className="text-center mb-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow">
          Ask a Question
        </button>
      </div>

      {/* Question Listings */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuestions.map((question) => (
          <div
            key={question.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">{question.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Category: {question.category}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-600 dark:text-gray-300">
                {question.answers} Answers
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {question.votes} Votes
              </span>
            </div>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
              View Answers
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CommunityQA;
