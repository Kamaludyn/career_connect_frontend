import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Mentorship from "./pages/Mentorship";
import Resources from "./pages/Resources";
import Jobs from "./pages/Jobs";
import SkillDev from "./pages/SkillDev";
import Events from "./pages/Events";
import CommunityQA from "./pages/CommunityQA";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import SignUp from "./pages/SignUp";
import JobDetails from "./pages/JobDetails";
import MentorProfile from "./pages/MentorProfile";
import EmployerDashboard from "./pages/EmployerDashboardPages/EmployerDashboard";

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
          path: "/skill-development",
          element: <SkillDev />,
        },
        {
          path: "/events",
          element: <Events />,
        },
        {
          path: "/community-q-and-a",
          element: <CommunityQA />,
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
          path: "/job-details",
          element: <JobDetails />,
        },
        {
          path: "/employer-dashboard",
          element: <EmployerDashboard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
