import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
const PrivateAdminRoute = ({ children }) => {
  const { accessToken } = useAdminAuth();
  return accessToken ? children : <Navigate to="/admin/login" />;
};

export default PrivateAdminRoute;
