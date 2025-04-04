import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Mentorship from "./pages/Mentorship";
import Resources from "./pages/Resources";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import SignUp from "./pages/SignUp";
import JobDetails from "./pages/JobDetails";
import StudentProfile from "./pages/StudentProfile";
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
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthProvider>
          <DataProvider>
            <MainLayout />,
          </DataProvider>
        </AuthProvider>
      ),
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
          path: "/resource-details/:id",
          element: <ResourceDetails />,
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <Profile />,
            </PrivateRoute>
          ),
        },
        {
          path: "/student-profile/:id",
          element: <StudentProfile />,
        },
        {
          path: "/mentor-profile/:id",
          element: <MentorProfile />,
        },
        {
          path: "/notifications",
          element: <Notifications />,
        },
        {
          path: "/mentor-dashboard",
          element: <MentorsDashboard />,
        },
        {
          path: "/job-details/:id",
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
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
    </>
  );
}
export default App;

// (    <>
// <RouterProvider router={router} />
// <Toaster position="top-right" reverseOrder={false} />
//   </>
// )
