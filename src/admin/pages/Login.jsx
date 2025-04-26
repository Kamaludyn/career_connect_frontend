import { useState } from "react";
import adminApi from "../services/AdminAxiosInstance";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAdminAuth();

  const navigate = useNavigate();

  // Function to toggle password visibility between text and password type
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Submit login credentials
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Access the form element
    const loginForm = e.target;

    // Extracting form values and structuring them into an object
    const adminData = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    };

    try {
      // Sends a POST request to the authentication endpoint with user credentials
      const response = await adminApi.post("/admin/login", adminData);

      // Stores the authentication access token and admin data upon successful login
      login(response.data.token, response.data.admin);

      // Navigates the user to the Admin home page after successful login
      navigate("/admin");
      toast.success("Login Successful");
    } catch (error) {
      // Handles different error scenarios
      if (error?.code === "ERR_NETWORK") {
        toast.error(error?.message);
      } else if (error?.response?.status === 400) {
        // If the server returns a 400 status (bad request), show the server's error message
        toast.error(error?.response?.data.message);
      } else {
        // Fallback error message for any other login failures
        toast.error("Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-primary flex flex-col justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-fit w-full max-w-md m-4">
        <div className="flex items-center justify-center w-20 h-20 mx-auto text-4xl font-black mb-6 bg-primary text-white rounded-full">
          CC
        </div>
        <h2 className="font-semibold text-center mb-6 text-[#666666]">
          Login to access the Admin Dashboard
        </h2>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-2 border-2 hover:border-secondary outline-none rounded"
            required
          />
          <div className="dark:bg-white w-full flex p-2 pr-2 border-2 hover:border-secondary rounded-md">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border-none outline-none"
              required
            />
            <span
              className="ml-2 text-xl cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <BsEyeSlash className="mt-0.5 text-text-secondary" />
              ) : (
                <BsEye className="mt-0.5 text-text-secondary" />
              )}
            </span>
          </div>

          <button
            type="submit"
            className={`w-full bg-secondary hover:bg-opacity-90 text-white pt-3 pb-2 px-3 rounded transition ${
              loading ? "cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? <ClipLoader color="#ffffff" size={18} /> : "Login"}
          </button>
          <div></div>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
