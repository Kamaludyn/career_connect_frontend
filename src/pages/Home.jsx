import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import React from "react";
import OnCampusJobs from "../components/OnCampusJobs";
import OffCampusJobs from "../components/OffCampusJobs";
import TopMentors from "../components/TopMentors";

const Home = () => {
  const navigate = useNavigate();

  // const mentors = [
  //   { name: "Jane Doe", expertise: "Software Engineering", link: "#" },
  //   { name: "John Smith", expertise: "Data Science", link: "#" },
  //   { name: "Emily Johnson", expertise: "Product Management", link: "#" },
  //   { name: "Michael Brown", expertise: "Cybersecurity", link: "#" },
  // ];

  const trendingJobs = [
    {
      title: "Software Engineer",
      company: "Tech Corp",
      location: "San, Francisco, CA",
      onCampus: false,
    },
    {
      title: "Marketing Manager",
      company: "Biz Group",
      location: "Commercial No.3, Shop 10",
      onCampus: true,
    },
    {
      title: "Data Scientist",
      company: "Data Solutions",
      location: "San Francisco, CA",
      onCampus: false,
    },
    {
      title: "Graphic Designer",
      company: "Creative Inc",
      location: "Commercial No.2, Shop 6",
      onCampus: true,
    },
    {
      title: "Product Manager",
      company: "Innovatech",
      location: "Remote",
      onCampus: false,
    },
    {
      title: "Sales Associate",
      company: "Retail Corp",
      location: "Commercial No.1, Shop 12",
      onCampus: true,
    },
    {
      title: "HR Specialist",
      company: "People First",
      location: "Austin, TX",
      onCampus: false,
    },
    {
      title: "Business Analyst",
      company: "Biz Analytics",
      location: "Commercial No.1, Shop 9",
      onCampus: true,
    },
    {
      title: "Customer Support",
      company: "Support Hub",
      location: "Remote",
      onCampus: false,
    },
    {
      title: "UX/UI Designer",
      company: "Design Studio",
      location: "Commercial No.2, Shop 7",
      onCampus: true,
    },
  ];

  const campusJobs = trendingJobs.filter((job) => job.onCampus === true);
  const offCampusJobs = trendingJobs.filter((job) => job.onCampus !== true);

  const expertAdvice = [
    {
      expert: "Jane Doe",
      advice: "Networking is key! Always follow up after meetings.",
    },
    {
      expert: "John Doe",
      advice: "Customize your resume for each job application.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-4 space-y-6 rounded-xl">
      {/* Hero Section */}
      <Hero />
      {/* Recommended Content */}
      <section>
        <h2 className="text-2xl font-bold">Recommended for You</h2>
        <div className="mt-4 space-y-3">
          <TopMentors />
          <OnCampusJobs campusJobs={campusJobs} />
          <OffCampusJobs offCampusJobs={offCampusJobs} />
        </div>
      </section>

      {/* Community Engagement */}
      <section>
        <h2 className="text-2xl font-bold">Community & Insights</h2>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Career Advice from Experts</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Get tips and guidance from professionals
          </p>
          <ul className="mt-2 list-disc pl-5">
            {expertAdvice.map((advice, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                <strong>{advice.expert}</strong>: {advice.advice}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
