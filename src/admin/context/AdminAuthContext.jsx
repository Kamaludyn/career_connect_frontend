import { createContext, useContext, useState, useEffect } from "react";
import adminApi from "../services/AdminAxiosInstance";

// Create the AdminAuthContext
const AdminAuthContext = createContext();

// Custom hook to use the Admin Auth context
export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

export const AdminAuthProvider = ({ children }) => {
  // The accessToken and admin data are initialized from localStorage to persist the admin's session across page reloads
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  // useEffect to update the Authorization header whenever the accessToken changes
  useEffect(() => {
    if (accessToken) {
      // If a accessToken exists, set it as the default Authorization header for all API requests
      adminApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    } else {
      // If no accessToken exists, remove the Authorization header
      delete adminApi.defaults.headers.common["Authorization"];
    }
  }, [accessToken]);

  // Login function
  const login = (accessToken, adminData) => {
    // Update the accessToken and admin state
    setAccessToken(accessToken);
    setAdmin(adminData);

    // Store accessToken and admin data in localStorage fro persistence
    localStorage.setItem("accessToken", accessToken);
    adminApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    localStorage.setItem("admin", JSON.stringify(adminData));
  };

  // Logout function
  const logout = () => {
    // Clear the admin data and accessToken state
    setAdmin(null);
    setAccessToken(null);

    // Remove the admin data and accessToken from localStorage
    localStorage.removeItem("admin");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("chatMessages");

    // Remove Authorization header
    delete adminApi.defaults.headers.common["Authorization"];
  };

  return (
    <AdminAuthContext.Provider value={{ admin, accessToken, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;
