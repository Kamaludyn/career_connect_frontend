import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import React from "react";

const Home = () => {
  const navigate = useNavigate();

  const mentors = [
    { name: "Jane Doe", expertise: "Software Engineering", link: "#" },
    { name: "John Smith", expertise: "Data Science", link: "#" },
    { name: "Emily Johnson", expertise: "Product Management", link: "#" },
    { name: "Michael Brown", expertise: "Cybersecurity", link: "#" },
  ];

  // const trendingJobs = [
  //   {
  //     title: "Frontend Developer",
  //     company: "TechCorp Inc.",
  //     location: "Remote",
  //   },
  //   {
  //     title: "Data Analyst",
  //     company: "Finance Solutions",
  //     location: "New York, NY",
  //   },
  //   {
  //     title: "Marketing Manager",
  //     company: "Creative Agency",
  //     location: "San Francisco, CA",
  //   },
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

      {/* Quick Actions */}
      {/* <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { title: "Find a Mentor", emoji: "🤝", link: "/mentorship" },
          { title: "Browse Jobs", emoji: "💼", link: "/jobs" },
          { title: "Career Resources", emoji: "📚", link: "/resources" },
          {
            title: "Skill Development",
            emoji: "🎯",
            link: "/skill-development",
          },
          { title: "Upcoming Events", emoji: "📆", link: "/events" },
          { title: "Community Q&A", emoji: "💬", link: "/community-q-and-a" },
        ].map((item, index) => (
          <div
            key={index}
            className="p-4 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow text-center cursor-pointer"
            onClick={() => navigate(item.link)}
          >
            <span className="text-4xl">{item.emoji}</span>
            <h3 className="text-sm md:text-lg font-semibold mt-2">
              {item.title}
            </h3>
          </div>
        ))}
      </section> */}

      {/* Recommended Content */}
      <section>
        <h2 className="text-2xl font-bold">Recommended for You</h2>
        <div className="mt-4 space-y-3">
          {/* <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Top Mentors in Your Field</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connect with industry experts
            </p>
          </div> */}
          <section className="mt-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Top Mentors in Your Field</h3>
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
          <section className="mt-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold">
              On-campus Trending Job Listings
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Find interesting jobs on campus
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {campusJobs.map((job, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <h4 className="text-md font-medium">
                    <strong>{job.title}</strong>
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    at {job.company} - {job.location}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section className="mt-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold">
              Trending Off campus Job Listings
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Find jobs tailored to your skills off campus
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {offCampusJobs.map((job, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <h4 className="text-md font-medium">
                    <strong>{job.title}</strong>
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    at {job.company} - {job.location}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* Community Engagement */}
      <section>
        <h2 className="text-2xl font-bold">Community & Insights</h2>
        {/* <div className="mt-4 space-y-3"> */}

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
        {/* </div> */}
      </section>
      {/* <section>
        <h2 className="text-2xl font-bold">Community & Insights</h2>
        <div className="mt-4 space-y-3">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Success Stories</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              See how others achieved their career goals
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold">
              Career Advice from Experts
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get tips and guidance from professionals
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;

// import SideBar from "../components/SideBar";
// import ThemeToggle from "../components/ThemeToggle";

// const Home = () => {
//   return (
//     <section className="flex w-full min-h-screen h-full">
//       <div className="w-full md:w-[60%] md:overflow-y-scroll">
//         {/* <Hero /> */}
//         {/* <Hero />
//         <Hero />
//         <Hero />
//         <Hero />
//         <Hero />
//         <Hero />
//         <Hero />
//         <Hero />
//         <Hero />
//         <Hero />
//         <Hero />
//         <Hero />
//         <Hero />
//         <Hero /> */}
//       </div>
//       <SideBar />
//     </section>
//   );
// };

// export default Home;
