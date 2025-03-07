import React from "react";
const mentors = [
  { name: "Jane Doe", expertise: "Software Engineering", link: "#" },
  { name: "John Smith", expertise: "Data Science", link: "#" },
  { name: "Emily Johnson", expertise: "Product Management", link: "#" },
  { name: "Michael Brown", expertise: "Cybersecurity", link: "#" },
];
const TopMentors = () => {
  return (
    <section className="mt-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold">Top Mentors</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Connect with industry experts
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <h4 className="text-md font-medium">{mentor.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {mentor.expertise}
            </p>
            <a
              href={mentor.link}
              className="text-blue-500 dark:text-blue-400 mt-2 block"
            >
              Connect
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopMentors;
