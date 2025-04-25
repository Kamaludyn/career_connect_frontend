import { Outlet } from "react-router-dom";
import AdminNav from "./components/AdminNav";

const DashboardLayout = () => {
  return (
    <>
      <AdminNav />
      <div className="box-border bg-white dark:bg-gray-700 h-full min-h-screen w-full text-xs md:text-base mx-auto md:pl-[5.5rem] px-2 md:px-6 mt-[60px] -mb-[40px]">
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
