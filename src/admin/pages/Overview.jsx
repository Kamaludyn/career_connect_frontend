import { useNavigate } from "react-router-dom";
import {
  BsPersonBadge,
  BsBriefcase,
  BsBuilding,
  BsMortarboard,
  BsBook,
} from "react-icons/bs";
import { useAdminData } from "../context/AdminDataContext";

const OverviewStats = () => {
  const { overviewCount } = useAdminData([]);

  const navigate = useNavigate();

  const stats = [
    {
      title: "Students",
      path: "student-management",
      value: overviewCount.students,
      icon: <BsPersonBadge />,
      color: "bg-blue-500",
    },
    {
      title: "Employers",
      path: "Employer-management",
      value: overviewCount.employers,
      icon: <BsBuilding />,
      color: "bg-green-500",
    },
    {
      title: "Mentors",
      path: "Mentor-management",
      value: overviewCount.mentors,
      icon: <BsMortarboard />,
      color: "bg-purple-500",
    },
    {
      title: "Active Jobs",
      path: "Job-management",
      value: overviewCount.jobs,
      icon: <BsBriefcase />,
      color: "bg-orange-500",
    },
    {
      title: "Resources",
      path: "resource-management",
      value: overviewCount.resources,
      icon: <BsBook />,
      color: "bg-cyan-500",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          onClick={() => navigate(`/admin/${stat.path}`)}
          className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-none shadow-lg rounded-lg p-5 flex items-center justify-between cursor-pointer hover:opacity-70"
        >
          <div>
            <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300">
              {stat.title}
            </h4>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </span>
          </div>
          <div
            className={`w-12 h-12 flex items-center justify-center text-white text-2xl rounded-full ${stat.color}`}
          >
            {stat.icon}
          </div>
        </div>
      ))}
    </section>
  );
};

export default OverviewStats;
