import {
  BsPersonBadge,
  BsBriefcase,
  BsBuilding,
  BsFlag,
  BsMortarboard,
} from "react-icons/bs";

const stats = [
  {
    title: "Students",
    value: 800,
    icon: <BsPersonBadge />,
    color: "bg-blue-500",
  },
  {
    title: "Employers",
    value: 250,
    icon: <BsBuilding />,
    color: "bg-green-500",
  },
  {
    title: "Mentors",
    value: 150,
    icon: <BsMortarboard />,
    color: "bg-purple-500",
  },
  {
    title: "Active Jobs",
    value: 350,
    icon: <BsBriefcase />,
    color: "bg-orange-500",
  },
  {
    title: "Reported Issues",
    value: 12,
    icon: <BsFlag />,
    color: "bg-red-500",
  },
];

const OverviewStats = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-none shadow-md rounded-lg p-5 flex items-center justify-between"
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
