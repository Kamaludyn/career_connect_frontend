import {
  BsSpeedometer,
  BsPeople,
  BsMortarboard,
  BsBuilding,
  BsBriefcase,
  BsFlag,
  BsGear,
  BsBoxArrowRight,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Overview",
    icon: <BsSpeedometer />,
    route: "/dashboard",
  },
  {
    label: "Students",
    icon: <BsPeople />,
    route: "/dashboard/students-management",
  },
  {
    label: "Mentors",
    icon: <BsMortarboard />,
    route: "/dashboard/mentors-management",
  },
  {
    label: "Employers",
    icon: <BsBuilding />,
    route: "/dashboard/employers-management",
  },
  {
    label: "Jobs",
    icon: <BsBriefcase />,
    route: "/dashboard/jobs-management",
  },
  {
    label: "Reports",
    icon: <BsFlag />,
    route: "/dashboard/reports",
  },
  {
    label: "Settings",
    icon: <BsGear />,
    route: "/dashboard/settings",
  },
];

const SideBarNav = ({ isOpen, toggleMenu }) => {
  return (
    <>
      <div
        className={` ${
          isOpen
            ? "fixed top-14 md:top-[63px] right-0 left-0 transition-all ease-linear duration-150 inset-0 bg-black opacity-50 z-20 md:hidden"
            : "right-[100%]"
        }`}
        onClick={toggleMenu} // Clicking outside the sidebar closes it
      />
      <nav
        className={`${
          isOpen ? "w-48 md:w-64" : "w-0 md:w-[60px] hover:md:w-64"
        } bg-primary dark:bg-darkBg text-white font-semibold h-full fixed top-14 md:top-[60px] group transition-all duration-300 overflow-hidden z-40`}
      >
        <ul className="space-y-2 pr-2 mt-7">
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <NavLink
                to={item.route}
                end
                className={({ isActive }) =>
                  isActive
                    ? "bg-secondary flex items-center gap-x-4 w-full rounded-r-full pl-7 py-1"
                    : "flex items-center gap-x-4 w-full hover:bg-blue-400 rounded-r-full pl-7 py-1"
                }
              >
                <span className="text-sm md:text-base">{item.icon}</span>
                <span className="text-base transition-all duration-300 cursor-pointer max-w-xs overflow-hidden whitespace-nowrap">
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
          <li className="pt-10">
            <button className="min-w-full pl-7 py-1 px-3 flex items-center gap-5 rounded-r-full hover:bg-cyan-300">
              <BsBoxArrowRight /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SideBarNav;
