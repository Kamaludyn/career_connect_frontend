import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { BsPersonCircle } from "react-icons/bs";
import ProfileEdit from "../components/ProfileEdit";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  // useEffect hook to fetch user profile when the component mounts or when the token changes
  useEffect(() => {
     // Function to fetch user profile data
    const fetchProfile = async () => {
      setLoading(true);

       // If no authentication token is available, exit the function early
      if (!token) return;

      try {
        // A GET request to fetch the authenticated user's profile
        const response = await api.get("/auth/profile");

         // Update profile state with fetched data
        setProfileInfo(response.data);
      } catch (error) {
           // Handle specific error scenarios
        if (error?.response?.code === "ERR_NETWORK") {
          toast.error("Network connection lost");
        } else if (error.response.status === 401) {
          toast.error(error.response.data.message);
          navigate("/login");
        }
        console.log("error response", error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

// Function to handle user logout
const handleLogOut = async () => {
  // Confirm logout action with the user
  const confirmLogout = confirm("Are you sure you want to Logout?");
  if (!confirmLogout) return; // Exit if user cancels logout

  try {
      // Send a POST request to log the user out
      const response = await api.post("/auth/logout");

      // Show success notification on successful logout
      toast.success(response.data.message);

      // Call the logout function (likely clears user session data)
      logout();

      // Redirect user to the login page
      navigate("/login");
  } catch (error) {
      // Log any errors that occur during logout
      console.error("Failed to Logout");
  }
};

  return (
    <>
      <div
        className={`w-full min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-xl ${
          isOpen ? "hidden" : "block"
        }`}
      >
        {loading ? (
          <div className="animate-pulse space-y-6">
            {/* Profile Header Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
              <div className="w-24 h-24 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-40 mx-auto mt-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mx-auto mt-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mx-auto mt-2"></div>
            </div>

            {/* Profile Sections Skeleton */}
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mt-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mt-2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
              <BsPersonCircle className="text-9xl rounded-full w-24 h-24 mx-auto" />
              <h2 className="text-2xl font-bold mt-2">
                {profileInfo.othername} {profileInfo.surname}
              </h2>
              {profileInfo.role === "mentor" && (
                <p className="text-gray-600 dark:text-gray-300">
                  {profileInfo.jobTitle}
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-300">
                {profileInfo.email}
              </p>
              {profileInfo.role === "employer" && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profileInfo.location}
                </p>
              )}
              <button
                className="mt-4 px-4 py-2 bg-secondary hover:bg-secondary text-white rounded-lg shadow"
                onClick={() => setIsOpen(true)}
              >
                Edit Profile
              </button>
            </div>

            {/* Profile Sections */}
            <div className="mt-6 space-y-6">
              {/* About Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold">About</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {profileInfo.bio || "Edit Profile to Add Bio"}
                </p>
              </div>

              {/* Skills Section */}
              {profileInfo.role !== "employer" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profileInfo?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {profileInfo.role !== "employer" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold">Work Experience</h3>
                  {profileInfo?.experience?.map((job, index) => (
                    <div key={index} className="mt-4">
                      <h4 className="font-semibold">
                        {job.role} at {job.company}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {job.duration}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {job.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Education Section */}
              {profileInfo.role !== "employer" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold">Education</h3>
                  {profileInfo?.education?.map((edu, index) => (
                    <div key={index} className="mt-4">
                      <h4 className="font-semibold">{edu.school}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {edu.degree} ({edu.year})
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications Section */}
              {profileInfo.role !== "employer" && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold">Certifications</h3>
                  {profileInfo?.certifications?.map((cert, index) => (
                    <div key={index} className="mt-4">
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Year: {cert.year}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {profileInfo.role === "employer" && (
                <>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold">Company Name</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {profileInfo.companyName}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold">Industry</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {profileInfo.industry}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold">Company Website</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {profileInfo.website}
                    </p>
                  </div>
                </>
              )}
              <button
                onClick={handleLogOut}
                className="mt-4 px-4 py-2 bg-secondary hover:bg-primary text-white rounded-lg shadow"
              >
                Log out
              </button>
            </div>
          </>
        )}
      </div>
      <ProfileEdit
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        profileInfo={profileInfo}
        setProfileInfo={setProfileInfo}
      />
    </>
  );
};

export default Profile;
