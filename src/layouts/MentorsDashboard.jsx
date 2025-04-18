import { NavLink, Outlet } from "react-router-dom";

const MentorsDashboard = () => {
  return (
    <div className="pt-16 md:pt-14 md:p-4 relative">
      {/* Navigation Tabs */}
      <nav className="absolute top-0 md:inset-x-4 w-full flex justify-between md:justify-start md:gap-4 py-2 md:p-2 text-sm border-b border-lightBorder">
        <NavLink
          to="/mentor-dashboard"
          className={({ isActive }) =>
            `md:px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ${
              isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Mentees
        </NavLink>

        <NavLink
          to="/mentor-dashboard/requests"
          className={({ isActive }) =>
            `md:px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ${
              isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Mentorship Requests
        </NavLink>

        <NavLink
          to="/mentor-dashboard/resources"
          className={({ isActive }) =>
            `md:px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ${
              isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          My Resources
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default MentorsDashboard;
