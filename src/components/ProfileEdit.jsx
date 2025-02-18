import React, { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";

const ProfileEdit = ({ isOpen, setIsOpen }) => {
  const [userType, setUserType] = useState("jobSeeker");
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    profilePicture: "",
    skills: "",
    experience: "",
    resume: "",
    companyInfo: "",
    jobPostings: "",
    expertise: "",
    availability: "",
    bio: "",
    linkedin: "",
    portfolio: "",
    achievements: "",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  // function handleClick(e) {
  //   // e.stopPropagation();
  //   console.log("Back");

  //   setIsOpen(false);
  // }
  return (
    <div
      className={`w-full p-6 bg-white dark:bg-gray-900 rounded-xl shadow ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="mb-3">
        <p
          className="w-fit py-2 px-4 border rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-primary cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          Back
        </p>
      </div>
      <h2 className="text-2xl font-bold">Edit Profile</h2>

      {/* Basic Info */}
      <div className="mt-4">
        <label className="block">Full Name</label>
        <input
          name="fullName"
          value={profileData.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-4">
        <label className="block">Email</label>
        <input
          name="email"
          value={profileData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled
        />
      </div>

      <div className="mt-4">
        <label className="block">Phone</label>
        <input
          name="phone"
          value={profileData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-4">
        <label className="block">Location</label>
        <input
          name="location"
          value={profileData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* User Type Specific Fields */}
      <div className="mt-6">
        <label className="block">User Type</label>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="jobSeeker">Job Seeker</option>
          <option value="employer">Employer</option>
          <option value="mentor">Mentor</option>
        </select>
      </div>

      {userType === "jobSeeker" && (
        <div className="mt-4">
          <label className="block">Skills</label>
          <input
            name="skills"
            value={profileData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block mt-4">Experience</label>
          <textarea
            name="experience"
            value={profileData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
      )}

      {userType === "employer" && (
        <div className="mt-4">
          <label className="block">Company Info</label>
          <input
            name="companyInfo"
            value={profileData.companyInfo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {userType === "mentor" && (
        <div className="mt-4">
          <label className="block">Expertise</label>
          <input
            name="expertise"
            value={profileData.expertise}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <label className="block mt-4">Availability</label>
          <textarea
            name="availability"
            value={profileData.availability}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-6">
        <label className="block">Bio</label>
        <textarea
          name="bio"
          value={profileData.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
      </div>

      <div className="mt-4">
        <label className="block">LinkedIn</label>
        <input
          name="linkedin"
          value={profileData.linkedin}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-4">
        <label className="block">Portfolio</label>
        <input
          name="portfolio"
          value={profileData.portfolio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-4">
        <label className="block">Achievements</label>
        <textarea
          name="achievements"
          value={profileData.achievements}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
      </div>

      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setIsOpen(false)}
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfileEdit;
