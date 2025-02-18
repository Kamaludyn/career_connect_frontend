import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className="pt-20 pb-20 md:pt-32 mx-auto w-full px-4 md:px-10 h-full bg-slate-200 dark:bg-gray-700">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
