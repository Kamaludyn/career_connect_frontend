import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const SignUp = () => {
  const [accountType, setAccountType] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Accessing the form element to retrieve input values
    const signUpForm = e.target;

    // Check if passwords match before proceeding
    if (signUpForm.password.value !== signUpForm.confirmPassword.value) {
      toast.error("Passwords do not match!");
      return;
    }

    // Base object data containing common fields for all account types
    let filteredData = {
      surname: signUpForm.surname.value,
      othername: signUpForm.othername.value,
      email: signUpForm.email.value,
      phone: signUpForm.phone.value,
      role: accountType,
      password: signUpForm.password.value,
    };

    // Adding fields dynamically based on account type
    if (accountType === "student") {
      filteredData = {
        ...filteredData, // Keep the base data
        department: signUpForm.department.value,
        level: signUpForm.level.value,
        skills: signUpForm.skills.value || null,
        yearsOfExperience: signUpForm.experience.value || null,
      };
    }

    if (accountType === "mentor") {
      filteredData = {
        ...filteredData, // Keep the base data
        department: signUpForm.department.value,
        yearOfGraduation: signUpForm.yearOfGraduation.value,
        jobTitle: signUpForm.jobTitle.value,
        companyName: signUpForm.companyName.value,
        industry: signUpForm.industry.value || null,
      };
    }

    if (accountType === "employer") {
      filteredData = {
        ...filteredData, // Keep the base data
        companyName: signUpForm.companyName.value,
        industry: signUpForm.industry.value,
        website: signUpForm.website.value,
      };
    }

    try {
      // Send registration request to the API
      const response = await api.post("/auth/register", filteredData);

      // Redirect user to login page after successful registration
      navigate("/login");

      // Successful sign-up message
      toast.success("Sign-Up Successful");

      // Clear form fields
      signUpForm.reset();
    } catch (error) {
      // Handle errors
      if (error.message === "Network Error") {
        // Network error (e.g., no internet connection)
        toast.error("Please check your network connection");
      } else if (error.response.status === 400) {
        // Bad request (e.g., invalid input data)
        toast.error(error.response.data.message);
      } else if (error.response.status === 409) {
        // Handle duplicate user error (e.g., email already exists)
        toast.error(error.response.data.message);
      } else {
        // Catch-all for any other errors
        toast.error("An error occured");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center rounded-xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-fit w-full max-w-md">
        <h2 className="text-2xl font-bold text-center dark:text-darkText">
          Sign Up
        </h2>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="othername"
            placeholder="Other Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
            required
          />

          <select
            name="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Account Type</option>
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
            <option value="employer">Employer</option>
          </select>

          {/* Dynamic Fields Based on Account Type */}
          {accountType === "student" && (
            <div>
              <input
                type="text"
                name="department"
                placeholder="Department"
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                type="text"
                name="level"
                placeholder="Level"
                className="w-full p-2 border rounded"
                required
              />
              <p className="dark:text-darkText mt-2">Optional</p>
              <input
                type="text"
                name="skills"
                placeholder="Key Skills (e.g. React, Python)"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="text"
                name="experience"
                placeholder="Years of Experience (e.g. 3)"
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          {accountType === "mentor" && (
            <>
              <input
                type="text"
                name="department"
                placeholder="Course Studied"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="yearOfGraduation"
                placeholder="Year of Graduation"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="jobTitle"
                placeholder="Current Job Title"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="industry"
                placeholder="Industry"
                className="w-full p-2 border rounded"
              />
            </>
          )}

          {accountType === "employer" && (
            <>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="industry"
                placeholder="Industry (e.g. Tech, Finance)"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="website"
                placeholder="Company Website or Email"
                className="w-full p-2 border rounded"
                required
              />
            </>
          )}

          <button
            type="submit"
            className={`w-full bg-secondary hover:bg-opacity-90 text-white py-3 px-3 rounded transition cursor-pointer ${
              loading && "cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader color="#ffffff" size={18} className="m-[-3px]" />
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="text-sm dark:text-white">
            Already have an account?{" "}
            <Link to={"/login"} className="text-secondary font-semibold">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
