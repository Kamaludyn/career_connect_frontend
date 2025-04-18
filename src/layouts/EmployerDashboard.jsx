import { NavLink, Outlet } from "react-router-dom";

const EmployerDashboard = () => {
  return (
    <section className="pt-16 md:pt-20 md:p-4 relative">
      {/* Navigation Tabs */}
      <nav className="absolute top-0 md:inset-x-4 w-full flex justify-between md:justify-start md:gap-4 py-2 md:p-2 text-sm border-b border-lightBorder">
        <NavLink
          to="/employer-dashboard"
          className={({ isActive }) =>
            `md:px-4 py-2 font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ${
              isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Your Jobs
        </NavLink>

        <NavLink
          to="/employer-dashboard/applicants"
          className={({ isActive }) =>
            `md:px-4 py-2 font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ${
              isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Recruit Applicants
        </NavLink>

        <NavLink
          to="/employer-dashboard/job-form"
          className={({ isActive }) =>
            `md:px-4 py-2 font-semibold rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ${
              isActive ? "text-primary" : "text-gray-700 dark:text-gray-300"
            }`
          }
        >
          Post New Job
        </NavLink>
      </nav>

      <Outlet />
    </section>
  );
};

export default EmployerDashboard;
