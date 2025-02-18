import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ProfileEdit from "../components/ProfileEdit";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    title: "Software Engineer at Google",
    gmail: "johndoe@gmail.com",
    location: "San Francisco, USA",
    bio: "Passionate software engineer specializing in frontend development and UX design.",
    skills: ["JavaScript", "React", "Node.js", "UX/UI Design"],
    experience: [
      {
        company: "Google",
        role: "Software Engineer",
        duration: "2021 - Present",
        description:
          "Developing scalable web applications and leading UI/UX improvements.",
      },
      {
        company: "Microsoft",
        role: "Frontend Developer",
        duration: "2018 - 2021",
        description:
          "Built interactive user interfaces and improved web accessibility.",
      },
    ],
    education: [
      {
        school: "Stanford University",
        degree: "BSc in Computer Science",
        year: "2014 - 2018",
      },
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        year: "2022",
      },
    ],
  };

  return (
    <>
      <div
        className={`w-full min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-xl ${
          isOpen ? "hidden" : "block"
        }`}
      >
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          {/* <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto"
        /> */}
          <BsPersonCircle className="text-9xl rounded-full w-24 h-24 mx-auto" />
          <h2 className="text-2xl font-bold mt-2">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-300">{user.title}</p>
          <p className="text-gray-600 dark:text-gray-300">{user.gmail}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.location}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
            onClick={() => setIsOpen(true)}
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Sections */}
        <div className="mt-6 space-y-6">
          {/* About Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
          </div>

          {/* Skills Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold">Work Experience</h3>
            {user.experience.map((job, index) => (
              <div key={index} className="mt-4">
                <h4 className="font-semibold">
                  {job.role} at {job.company}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {job.duration}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {job.description}
                </p>
              </div>
            ))}
          </div>

          {/* Education Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold">Education</h3>
            {user.education.map((edu, index) => (
              <div key={index} className="mt-4">
                <h4 className="font-semibold">{edu.school}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {edu.degree} ({edu.year})
                </p>
              </div>
            ))}
          </div>

          {/* Certifications Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold">Certifications</h3>
            {user.certifications.map((cert, index) => (
              <div key={index} className="mt-4">
                <h4 className="font-semibold">{cert.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Year: {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProfileEdit isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Profile;
