import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import {
  BsPerson,
  BsBell,
  BsChatDots,
  BsCircleFill,
  BsSearch,
} from "react-icons/bs";
import Menu from "./Menu";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const searchRef = useRef(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Function to handle clicks outside search input
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Function to handle user logout
  const handleLogOut = () => {
    // Confirm logout action with the user
    const confirmLogout = confirm("Are you sure you want to Logout?");
    if (!confirmLogout) return;

    // Call the logout function
    logout();

    // Redirect user to the login page
    navigate("/login");
  };

  return (
    <nav className="relative">
      <div className="fixed top-0 left-0 bg-primary w-full flex justify-between items-center gap-2 px-4 py-3 md:p-4 md:py-2 md:pl-10 dark:bg-darkBg dark:text-darkText transition-all border-b border-gray-200 z-50">
        <div
          className="font-black bg-white p-1 text-lg text-primary rounded-full cursor-pointer"
          onClick={() => navigate("/")}
        >
          CC
        </div>
        <div className="w-[90%] flex items-center justify-end gap-1 md:gap-5 md:pr-10 md:pl-10 text-[20px] md:text-2xl">
          <div
            ref={searchRef}
            className={`md:mr-auto md:w-[60%] md:p-0 md:gap-0 md:pl-4 md:bg-lightBg md:rounded-3xl hover ${
              isOpen
                ? "w-full flex items-center gap-1 transition-all p-1 pr-2 bg-lightBg text-white dark:text-white rounded-3xl hover:text-primary cursor-pointer"
                : "flex items-center gap-1 transition-all p-1 bg-transparent text-darkText rounded-md hover:bg-gray-300 md:hover:bg-lightBg md:dark:hover:bg-lightBg dark:hover:bg-gray-700 hover:text-primary cursor-pointer"
            }`}
          >
            <input
              type="text"
              name="search"
              id="search"
              className={`${
                isOpen ? "block w-full outline-none pl-3" : "hidden"
              } text-lightText md:block md:w-full md:outline-none md:py-1 rounded-l-3xl`}
            />
            <div className="md:bg-gray-300 md:-mr-1 md:h-full p-1 md:p-2 rounded-r-3xl text-darkText md:text-primary hover:text-primary md:hover:bg-gray-100 md:dark:bg-gray-700 md:hover:dark:bg-textSecondary">
              <BsSearch
                className={`${isOpen && "text-primary"}`}
                onClick={() => setIsOpen(true)}
              />
            </div>
          </div>
          {(user?.role === "mentor" || user?.role === "employer") && (
            <div
              id="dashboard"
              className={`${
                isOpen && "hidden"
              } md:hidden group relative transition-all p-1 text-white border border-lightBorder hover:bg-gray-300 dark:hover:bg-gray-700 text-sm hover:text-primary rounded-xl cursor-pointer`}
              onClick={
                user?.role === "mentor"
                  ? () => navigate("/mentor-dashboard")
                  : () => navigate("/employer-dashboard")
              }
            >
              Dashboard
            </div>
          )}
          <div
            className="hidden md:block relative transition-all p-1 text-white dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary cursor-pointer z-20"
            onClick={() => navigate("/messages")}
          >
            <BsChatDots />
            <BsCircleFill className="absolute top-3.5 right-0.5 text-[10px] text-warning" />
          </div>
          <div
            className="relative transition-all p-1 text-white dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary cursor-pointer"
            onClick={() => navigate("/notifications")}
          >
            <BsBell />
            <BsCircleFill className="absolute top-3.5 right-0.5 text-[10px] text-warning" />
          </div>
          <div
            ref={profileMenuRef}
            className="relative group transition-all p-1 text-white dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <BsPerson />
            <div
              id="modal"
              className={`scale-0 absolute top-8 left-1/2 transform -translate-x-1/2 min-w-20 p-3 mx-auto bg-white text-secondary text-base text-center rounded-md space-y-1 shadow-md shadow-gray-400 cursor-default 
                ${openMenu ? "scale-100" : "scale-0"} 
                group-hover:scale-100 group-hover:dark:bg-darkBg dark:shadow-gray-800 dark:border border-gray-700 
              `}
            >
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer hover:text-blue-900 hover:underline"
              >
                Profile
              </p>
              {user && (
                <>
                  <p className="cursor-pointer hover:text-blue-900 hover:underline">
                    Settings
                  </p>
                  <p
                    onClick={handleLogOut}
                    className="cursor-pointer hover:text-blue-900 hover:underline"
                  >
                    Logout
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <Menu isOpen={isOpen} />
    </nav>
  );
};

export default NavBar;
