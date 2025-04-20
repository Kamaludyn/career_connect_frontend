import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../services/api";
import ClipLoader from "react-spinners/ClipLoader";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //   Handle Change password form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      console.log("password change success");
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log("change pword err", error.response.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center rounded-xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-fit w-full max-w-md">
        <h2 className="text-2xl font-bold text-center dark:text-darkText">
          Change Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border-2 hover:border-secondary outline-none rounded"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border-2 hover:border-secondary outline-none rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border-2 hover:border-secondary outline-none rounded"
            required
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
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
