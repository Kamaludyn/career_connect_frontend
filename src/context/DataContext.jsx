import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

// Create the ResourcesContext
const DataContext = createContext();

// Custom hook to use the Data context
export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [mentors, setMentors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [resources, setResources] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unReadNotifications, setUnReadNotifications] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState({
    jobs: [],
    mentors: [],
    resources: [],
  });

  const { user } = useAuth();

  // Remove the user and token from localStorage
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all data at once
        const [mentorsRes, jobsRes, resourcesRes] = await Promise.all([
          api.get("/users/mentors"), // Fetch mentors
          api.get("/jobs"), // Fetch jobs
          api.get("/resources"), // Fetch resources
        ]);

        // Update state with the fetched data
        setMentors(mentorsRes?.data);
        setJobs(jobsRes?.data);
        setResources(resourcesRes?.data);
      } catch (error) {
        // Handle errors during the fetch
        if (!error.response) {
          toast.error(error.message);
        } else {
          toast.error("Fetching data failed");
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchNotifications = async () => {
      setLoading(true);

      try {
        const response = await api.get("/notifications");

        // Check if any notification is unread
        setUnReadNotifications(response.data.some((n) => n.isRead !== true));

        // Current timestamp in milliseconds which allows for time manipulation and comparison.
        const currentTime = new Date();

        const formattedNotification = response.data.map((res) => {
          // Convert createdAt to a Date object which also allows for time manipulation and comparison.
          const createdTime = new Date(res.createdAt);

          // Get time difference (the result is in milliseconds)
          const timeDifference = currentTime - createdTime;

          // Divide the timeDifference(milliseconds) by 1000 to convert to seconds
          const seconds = Math.floor(timeDifference / 1000);

          // Divide the seconds by 60 to get minutes
          const minutes = Math.floor(seconds / 60);

          // Divide the minutes by 60 to get hours
          const hours = Math.floor(minutes / 60);

          // Divide the hours by 24 to get hours
          const days = Math.floor(hours / 24);

          let timeCreated;

          // Determine the timeCreated based on the time difference
          if (seconds < 60) {
            timeCreated = `${seconds} sec ago`;
          } else if (minutes < 60) {
            timeCreated = `${minutes} min ago`;
          } else if (hours < 24) {
            timeCreated = `${hours} hours ago`;
          } else {
            timeCreated = `${days} days ago`;
          }

          // Add timeCreated to each notification
          return { ...res, timeCreated };
        });
        setNotifications(formattedNotification);
      } catch (error) {
        if (error?.code === "ERR_NETWORK") {
          toast.error("Network Error");
        } else {
          console.error("Error getting notifications", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications(); // Call the fetchNotifications function

    fetchData(); // Call the fetchData function
  }, [user?._id]);

  // Function to handle job applications
  const applyForJob = async (jobId) => {
    try {
      const response = await api.post(`/applications/${jobId}`);
      toast.success(response.data.message); // Show success message
      return true;
    } catch (error) {
      // Handle errors based on the response status
      if (error?.response?.status === 401) {
        toast.error("Only Students can apply for jobs"); // Unauthorized
      } else if (error?.response?.status === 403) {
        toast.error(error.response.data.message); // Forbidden error
      } else if (error?.response?.status === 404) {
        toast.error(error.response.data.message); // Job not found
      } else {
        toast.error("An Unknown Error Occurred"); // Generic error message
      }
      return false;
    }
  };

  // Define an asynchronous function to request mentorship
  const requestMentorship = async (message, mentorId) => {
    try {
      // Make a POST request to the mentorship API endpoint using the mentor's ID with a message attached
      const response = await api.post(`/mentorships/${mentorId}`, {
        message,
      });
      toast.success(response.data.message);
      return true; // Return true indicating the request was successful
    } catch (error) {
      // Handle different error cases that may occur during the API request
      if (error?.code === "ERR_NETWORK") {
        toast.error(error?.message);
      } else if (error?.response?.status === 400) {
        toast.error(error.response.data.message);
      } else if (error?.response?.status === 403) {
        toast.error(error.response.data.message);
      } else if (error?.response?.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An Unknown Error Occurred");
      }
      return false; // Return false indicating the request failed
    }
  };

  const searchSite = async (query, page = 1, limit = 10) => {
    const response = await api.get(
      `/search?q=${query}&page=${page}&limit=${limit}`
    );
    return response.data;
  };

  return (
    <DataContext.Provider
      value={{
        mentors,
        jobs,
        resources,
        notifications,
        unReadNotifications,
        setNotifications,
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        applyForJob,
        requestMentorship,
        searchSite,
        loading,
        searching,
        setSearching,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
