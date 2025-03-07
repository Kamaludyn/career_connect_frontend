import React from "react";
import { BsPersonCircle } from "react-icons/bs";

const MentorProfile = () => {
  const mentor = {
    id: 1,
    name: "Dr. Jane Doe",
    title: "Senior Data Scientist",
    company: "AI Solutions Ltd.",
    location: "San Francisco, CA",
    bio: "Passionate about AI and mentoring aspiring data scientists. Over 10 years of experience in the industry.",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Python",
      "Data Visualization",
    ],
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <BsPersonCircle className="text-9xl rounded-full self-center w-24 h-24" />

        <div>
          <h1 className="text-2xl font-bold">{mentor.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {mentor.title} at {mentor.company}
          </p>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-2">
            Location: {mentor.location}
          </p>
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-4">About</h2>
      <p className="text-md text-gray-700 dark:text-gray-300 mt-2">
        {mentor.bio}
      </p>
      <h2 className="text-xl font-semibold mt-4">Skills</h2>
      <ul className="list-disc ml-5 mt-2">
        {mentor.skills.map((skill, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            {skill}
          </li>
        ))}
      </ul>
      <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Request Mentorship
      </button>
    </div>
  );
};

export default MentorProfile;
