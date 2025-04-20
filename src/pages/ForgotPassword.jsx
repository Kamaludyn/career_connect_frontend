import { useState } from "react";
import api from "../services/api";
import ClipLoader from "react-spinners/ClipLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  //   Handle Forgot password form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await api.post("/auth/forgot-password", { email });
      setStatus({ success: true, message: response.data.message });
    } catch (error) {
      setStatus({
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center rounded-xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-fit w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center dark:text-darkText">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader color="#ffffff" size={18} />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-center ${
              status ? "text-blue-500" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
