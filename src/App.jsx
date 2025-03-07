import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Mentorship from "./pages/Mentorship";
import Resources from "./pages/Resources";
import Jobs from "./pages/Jobs";
import SkillDev from "./pages/SkillDev";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import SignUp from "./pages/SignUp";
import JobDetails from "./pages/JobDetails";
import MentorProfile from "./pages/MentorProfile";
import EmployerDashboard from "./pages/EmployerDashboard";
import MentorsDashboard from "./pages/MentorsDashboard";
import ResourceDetails from "./pages/ResourceDetails";
import AdminLayout from "./admin/AdminLayout";
import Overview from "./admin/pages/Overview";
import StudentsMgt from "./admin/pages/StudentsMgt";
import MentorsMgt from "./admin/pages/MentorsMgt";
import EmployersMgt from "./admin/pages/EmployersMgt";
import JobsMgt from "./admin/pages/JobsMgt";
import Reports from "./admin/pages/Reports";
import NotificationsMgt from "./admin/pages/NotificationMgt";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/mentorship",
          element: <Mentorship />,
        },
        {
          path: "/jobs",
          element: <Jobs />,
        },
        {
          path: "/resources",
          element: <Resources />,
        },
        {
          path: "/resource-details",
          element: <ResourceDetails />,
        },
        {
          path: "/skill-development",
          element: <SkillDev />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/notifications",
          element: <Notifications />,
        },
        {
          path: "/mentor-profile",
          element: <MentorProfile />,
        },
        {
          path: "/mentor-dashboard",
          element: <MentorsDashboard />,
        },
        {
          path: "/job-details",
          element: <JobDetails />,
        },
        {
          path: "/employer-dashboard",
          element: <EmployerDashboard />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <AdminLayout />,

      children: [
        {
          path: "",
          element: <Overview />,
        },
        {
          path: "students-management",
          element: <StudentsMgt />,
        },
        {
          path: "mentors-management",
          element: <MentorsMgt />,
        },
        {
          path: "employers-management",
          element: <EmployersMgt />,
        },
        {
          path: "jobs-management",
          element: <JobsMgt />,
        },
        {
          path: "reports",
          element: <Reports />,
        },
        {
          path: "notifications",
          element: <NotificationsMgt />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
}
export default App;

// (    <>
// <RouterProvider router={router} />
// <Toaster position="top-right" reverseOrder={false} />
//   </>
// )
