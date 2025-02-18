import React, { useState } from "react";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const events = [
    {
      title: "Tech Networking Night",
      date: "2025-03-10",
      category: "Networking",
      location: "New York",
      link: "#",
    },
    {
      title: "Frontend Development Webinar",
      date: "2025-02-25",
      category: "Webinar",
      location: "Online",
      link: "#",
    },
    {
      title: "Career Fair 2025",
      date: "2025-04-05",
      category: "Job Fair",
      location: "San Francisco",
      link: "#",
    },
  ];

  const filteredEvents = events.filter(
    (event) =>
      (categoryFilter ? event.category === categoryFilter : true) &&
      (searchQuery
        ? event.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl">
      {/* Header Section */}
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Stay updated with career-building opportunities
        </p>
        <input
          type="text"
          placeholder="Search events..."
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
          <option value="Networking">Networking</option>
          <option value="Webinar">Webinar</option>
          <option value="Job Fair">Job Fair</option>
        </select>
      </section>

      {/* Event Listings */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Date: {event.date}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Category: {event.category}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Location: {event.location}
            </p>
            <a
              href={event.link}
              className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Register
            </a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Events;
