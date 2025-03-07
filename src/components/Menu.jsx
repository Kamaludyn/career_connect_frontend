import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import {
  BsBook,
  BsBriefcase,
  BsEnvelope,
  BsHouse,
  BsPeople,
  BsPerson,
} from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

const Menu = ({ isOpen }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  let lastScrollY = window.scrollY; // Track previous scroll position

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // If scrolling down, hide the navbar
        setIsVisible(false);
      } else {
        // If scrolling up, show the navbar
        setIsVisible(true);
      }

      lastScrollY = currentScrollY; // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      title: "Home",
      icon: <BsHouse className="text-2xl mx-auto" />,
      path: "/",
    },
    {
      title: <span>Messages</span>,
      icon: <BsEnvelope className="text-2xl mx-auto" />,
      path: "/messages",
    },
    {
      title: <span>Jobs</span>,
      icon: <BsBriefcase className="text-2xl mx-auto" />,
      path: "/jobs",
    },
    {
      title: <span>Mentors</span>,
      icon: <BsPeople className="text-2xl mx-auto" />,
      path: "/mentorship",
    },
    {
      title: <span>Resources</span>,
      icon: <BsBook className="text-2xl mx-auto" />,
      path: "/resources",
    },
  ];

  const lgMenuItems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: <span>Mentorship</span>,
      path: "/mentorship",
    },
    {
      title: <span>Jobs</span>,
      path: "/jobs",
    },
    {
      title: <span>Resources</span>,
      path: "/resources",
    },
  ];

  return (
    <>
      {/* Small Screen Menu */}
      <section className="">
        <ul className="fixed bottom-0 left-0 md:hidden w-full bg-lightBg dark:bg-darkBg dark:text-darkText shadow-md flex justify-around items-center pt-1.5 pb-1 px-2 rounded-t-xl border-t border-textSecondary dark:border-lightBorder z-50">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center text-center mx-auto text-sm sm:text-base"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "p-1 border border-darkBorder dark:border-lightBorder text-lightText dark:text-darkText rounded-lg mx-auto"
                    : "p-1 border border-transparent text-textSecondary dark:text-darkText mx-auto"
                }
              >
                {item.icon}
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
      {/* Large Screen Menu */}
      <section
        className={`hidden fixed top-14 left-0 w-full md:flex justify-end bg-primary dark:bg-darkBg text-darkText border-t transition-transform z-40 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="flex items-center mx-4">
          {lgMenuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 text-primary dark:bg-gray-700 md:mx-0.5"
                  : "false md:mx-1"
              }
            >
              <li className="py-3 px-2 text-lg font-medium cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary ">
                {item.title}
              </li>
            </NavLink>
          ))}
          <li className="relative group text-lg mx-1 font-medium cursor-pointer">
            <span className="h-full w-full p-2 border border-text-primary hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary rounded-2xl">
              Dashboard
            </span>
            <div className="hidden absolute group-hover:block top-[33px] right-0 w-full text-lightText bg-lightBg dark:bg-darkBg dark:text-darkText shadow-lg rounded-2xl border border-gray-300 dark:border-lightBorder p-1 divide-y">
              <p
                className="p-1 hover:text-primary"
                onClick={() => navigate("/employer-dashboard")}
              >
                Employer
              </p>
              <p
                className="p-1 hover:text-primary"
                onClick={() => navigate("/mentor-dashboard")}
              >
                Mentor
              </p>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Menu;
