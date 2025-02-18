import React, { useState } from "react";

const SignUp = () => {
  const [accountType, setAccountType] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    jobTitle: "",
    companyName: "",
    skills: "",
    experience: "",
    industry: "",
    website: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  return (
    <section className="min-h-screen flex justify-center rounded-xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-fit w-full max-w-md">
        <h2 className="text-2xl font-bold text-center dark:text-darkText">
          Sign Up
        </h2>

        <form className="space-y-4 mt-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <select
            name="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Account Type</option>
            <option value="student">Student</option>
            <option value="employer">Employer</option>
            <option value="mentor">Mentor</option>
          </select>

          {/* Dynamic Fields Based on Account Type */}
          {accountType === "student" && (
            <div>
              <p className="dark:text-darkText">Optional</p>
              <input
                type="text"
                name="skills"
                placeholder="Key Skills (e.g. React, Python)"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="text"
                name="experience"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          {accountType === "employer" && (
            <>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="industry"
                placeholder="Industry (e.g. Tech, Finance)"
                value={formData.industry}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="website"
                placeholder="Company Website"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </>
          )}

          {accountType === "mentor" && (
            <>
              <input
                type="text"
                name="jobTitle"
                placeholder="Current Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="industry"
                placeholder="Industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </>
          )}
          <div>
            <label htmlFor="profilePicture" className="dark:text-darkText">
              Add Profile Picture
            </label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
