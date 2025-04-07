import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import api from "../services/api";
import { BsPersonCircle } from "react-icons/bs";

const StudentProfile = () => {
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // Check if there is any state passed through the navigation
    if (!location.state) {
      // if no state is available then use the id from the url and fetch the user data manually
      const fetchJob = async () => {
        try {
          const response = await api.get(`/users/${id}`);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user Data");
        }
      };

      fetchJob();
    } else {
      // If state is passed from navigation, use that to avoid refetching from the server.
      setUserData(location.state.user);
    }
  }, []);

  return (
    <div className="mx-auto p-4 pb-10 bg-white dark:bg-gray-800 rounded-lg shadow">
      <p
        className="w-fit py-2 px-4 border rounded-lg hover:bg-transparent bg-gray-300 dark:text-black dark:hover:bg-gray-700 hover:text-primary cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Back
      </p>
      <div className="md:ml-[10%]">
        <div className="flex flex-col items-center md:flex-row gap-2 md:gap-4 mt-5">
          <BsPersonCircle className="text-9xl rounded-full w-24 h-24 dark:text-gray-300" />
          <div>
            <h1 className="text-2xl font-bold dark:text-gray-300">
              {userData?.othername} {userData?.surname}
            </h1>
            <p className="text-md text-gray-700 dark:text-gray-300">
              {userData?.email}
            </p>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-4">About</h2>
        <p className="text-md md:text-xl text-gray-700 dark:text-gray-300">
          {userData?.bio}
        </p>
        <h2 className="text-xl font-semibold mt-4">Department:</h2>
        <p className="text-md text-gray-700 dark:text-gray-300">
          {userData?.department}
        </p>
        {userData?.role === "student" && (
          <>
            <h2 className="text-xl font-semibold mt-4">Level:</h2>
            <p className="text-md text-gray-700 dark:text-gray-300">
              {userData?.level}
            </p>
          </>
        )}

        <h2 className="text-xl font-semibold mt-4">Certifications:</h2>
        <p className="text-md text-gray-700 dark:text-gray-300">
          {userData?.certifications}
        </p>
        <h2 className="text-xl font-semibold mt-4">Skills</h2>
        <p className="text-md text-gray-700 dark:text-gray-300">
          {userData?.skills}
        </p>
      </div>
    </div>
  );
};

export default StudentProfile;
