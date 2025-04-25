import { createContext, useContext, useState, useEffect, useMemo } from "react";
import adminApi from "../services/AdminAxiosInstance";
import { toast } from "react-hot-toast";

// Create the ResourcesContext
const AdminDataContext = createContext();

// Custom hook to use the Data context
export const useAdminData = () => {
  return useContext(AdminDataContext);
};

export const AdminDataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [overviewCount, setOverviewCount] = useState({});

  // Fetch admin-related data on initail mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await adminApi.get("/users");
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to load users");
        console.error("User Error:", error);
      }

      try {
        const response = await adminApi.get("/jobs");
        setJobs(response.data);
      } catch (error) {
        toast.error("Failed to load jobs");
        console.error("Job Error:", error);
      }

      try {
        const response = await adminApi.get("/admin/count");
        setOverviewCount(response.data);
      } catch (error) {
        toast.error("Failed to load overview data");
        console.error("Overview Error:", error);
      }
    };

    loadData();
  }, []);

  // Memoizing the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      users,
      setUsers,
      jobs,
      setJobs,
      overviewCount,
    }),
    [users, jobs, overviewCount]
  );

  return (
    <AdminDataContext.Provider value={contextValue}>
      {children}
    </AdminDataContext.Provider>
  );
};

export default AdminDataContext;
