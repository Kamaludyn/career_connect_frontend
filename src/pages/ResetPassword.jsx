import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //   Handle Reset password form submission (after user clicks the link in email)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if passwords match before proceeding
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await api.post(`/auth/reset-password/${token}`, {
        password,
      });
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center rounded-xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-fit w-full max-w-md">
        <h2 className="text-2xl font-bold text-center dark:text-darkText">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="password"
            className="w-full p-2 border-2 hover:border-secondary outline-none rounded"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border-2 hover:border-secondary outline-none rounded"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className={`w-full bg-secondary hover:bg-opacity-90 text-white pt-3 pb-2 px-3 rounded transition ${
              loading ? "cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader color="#ffffff" size={18} />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
