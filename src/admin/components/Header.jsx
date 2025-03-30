import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";
import { BsPersonCircle, BsList, BsBell, BsCircleFill } from "react-icons/bs";

const Header = ({ toggleMenu }) => {
  const navigate = useNavigate();
  return (
    <>
      <header className="bg-primary dark:bg-darkBg w-full md:text-xl fixed top-0 left-0 flex justify-between items-center py-3 pl-5 pr-6 z-40 overflow-hidden">
        <div className="flex gap-6 items-center">
          <div
            className="hover:cursor rounded-full hover:bg-blue-400 p-2 cursor-pointer"
            onClick={toggleMenu}
          >
            <BsList className="text-white text-2xl font-black" />
          </div>
          <Link
            to="/"
            className="font-black bg-white p-1 text-lg text-primary rounded-full cursor-pointer "
          >
            CC
          </Link>
        </div>
        <div className="flex items-center gap-2 md:text-3xl">
          <BsPersonCircle
            title="My Profile"
            className="text-white text-3xl hover:bg-[#ffffff28] p-1 rounded-md cursor-pointer"
            onClick={() => navigate("/dashboard/profile")}
          />
          <div
            className="relative transition-all p-1 text-3xl text-white dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary cursor-pointer"
            onClick={() => navigate("/dashboard/notifications")}
          >
            <BsBell className="text-xl" />
            <BsCircleFill className="absolute top-3.5 right-0.5 text-[10px] text-warning" />
          </div>
          <ThemeToggle />
        </div>
      </header>
    </>
  );
};

export default Header;
