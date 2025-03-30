import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";

const ProfileEdit = ({ isOpen, setIsOpen, profileInfo, setProfileInfo }) => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(profileInfo || {});

  useEffect(() => {
    setProfileData(profileInfo);
  }, [profileInfo]);

  // Submit updated profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.patch("/auth/profile", profileData);
      setProfileInfo(response.data);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      if (error.message === "Network Error") {
        toast.error(error.message);
      } else {
        toast.error("An Error Occurred while updating profile");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`w-full p-6 bg-white dark:bg-gray-900 dark:text-darkText rounded-xl shadow ${
        isOpen ? "block" : "hidden"
      }`}
      onSubmit={handleSubmit}
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

      <div className="mt-4">
        <label className="block">Surname</label>
        <input
          type="text"
          value={profileData.surname || ""}
          onChange={(e) =>
            setProfileData({ ...profileData, surname: e.target.value })
          }
          name="surname"
          className="w-full p-2 border dark:text-lightText rounded-lg"
        />
      </div>

      <div className="mt-4">
        <label className="block">Other Name</label>
        <input
          type="text"
          value={profileData.othername || ""}
          onChange={(e) =>
            setProfileData({ ...profileData, othername: e.target.value })
          }
          name="othername"
          className="w-full p-2 border dark:text-lightText rounded-lg"
        />
      </div>

      <div className="mt-4">
        <label className="block">Phone</label>
        <input
          type="number"
          value={profileData.phone || ""}
          onChange={(e) =>
            setProfileData({ ...profileData, phone: e.target.value })
          }
          name="phone"
          className="w-full p-2 border dark:text-lightText rounded-lg"
        />
      </div>

      <div className="mt-4">
        <label className="block">Bio</label>
        <textarea
          name="bio"
          value={profileData.bio || ""}
          onChange={(e) =>
            setProfileData({ ...profileData, bio: e.target.value })
          }
          className="w-full p-2 border dark:text-lightText rounded-lg"
        ></textarea>
      </div>

      {profileInfo.role !== "employer" && (
        <div className="mt-4">
          <label className="block">Skills</label>
          <input
            type="text"
            value={profileData.skills || ""}
            onChange={(e) =>
              setProfileData({ ...profileData, skills: e.target.value })
            }
            name="skills"
            className="w-full p-2 border dark:text-lightText rounded-lg"
          />
        </div>
      )}

      {profileInfo.role !== "employer" && (
        <div className="space-y-2 mt-4">
          <label className="block">Education</label>
          <input
            type="text"
            value={profileData.education?.school || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                education: {
                  ...profileData.education,
                  school: e.target.value,
                },
              })
            }
            name="eduSchool"
            className="w-full p-2 border dark:text-lightText rounded-lg"
            placeholder="School"
          />
          <input
            type="text"
            value={profileData.education?.degree || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                education: {
                  ...profileData.education,
                  degree: e.target.value,
                },
              })
            }
            name="eduDegree"
            className="w-full p-2 border dark:text-lightText rounded-lg"
            placeholder="Degree"
          />
          <input
            type="number"
            value={profileData.education?.year || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                education: {
                  ...profileData.education,
                  year: e.target.value,
                },
              })
            }
            name="eduYear"
            className="w-full p-2 border dark:text-lightText rounded-lg"
            placeholder="Year"
          />
        </div>
      )}

      {profileInfo.role === "student" && (
        <div className="mt-4">
          <label className="block">Level</label>
          <input
            type="number"
            value={profileData.level || ""}
            onChange={(e) =>
              setProfileData({ ...profileData, level: e.target.value })
            }
            name="level"
            className="w-full p-2 border dark:text-lightText rounded-lg"
          />
        </div>
      )}

      {profileInfo.role !== "employer" && (
        <div className="space-y-2 mt-4">
          <label className="block">Certifications</label>
          <input
            type="text"
            value={profileData.certifications?.name || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                certifications: {
                  ...profileData.certifications,
                  name: e.target.value,
                },
              })
            }
            name="certName"
            className="w-full p-2 border dark:text-lightText rounded-lg"
            placeholder="Certification Name"
          />
          <input
            type="number"
            value={profileData.certifications?.year || ""}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                certifications: {
                  ...profileData.certifications,
                  year: e.target.value,
                },
              })
            }
            name="certYear"
            className="w-full p-2 border dark:text-lightText rounded-lg"
            placeholder="Year Obtained"
          />
        </div>
      )}

      {profileInfo.role !== "employer" && (
        <div className="mt-4">
          <label className="block">Experience</label>
          <input
            type="text"
            value={profileData.experience || ""}
            onChange={(e) =>
              setProfileData({ ...profileData, experience: e.target.value })
            }
            name="experience"
            className="w-full p-2 border dark:text-lightText rounded-lg"
          />
        </div>
      )}

      {profileInfo.role !== "student" && (
        <div className="mt-4">
          <label className="block">Industry</label>
          <input
            type="text"
            value={profileData.industry || ""}
            onChange={(e) =>
              setProfileData({ ...profileData, industry: e.target.value })
            }
            name="industry"
            className="w-full p-2 border dark:text-lightText rounded-lg"
          />
        </div>
      )}
      {profileInfo.role === "mentor" && (
        <>
          <div className="mt-4">
            <label className="block">Job Title</label>
            <input
              type="text"
              value={profileData.jobTitle || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, jobTitle: e.target.value })
              }
              name="jobTitle"
              className="w-full p-2 border dark:text-lightText rounded-lg"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="availability" className="font-semibold">
              Availability
            </label>
            <div>
              <div>Available for Mentorship</div>
              <input
                type="radio"
                name="availability"
                value="true"
                checked={profileData.availability === true}
                onChange={() =>
                  setProfileData({ ...profileData, availability: true })
                }
              />
              <div>Not Available for Mentorship</div>
              <input
                type="radio"
                name="availability"
                value="false"
                checked={profileData.availability === false}
                onChange={() =>
                  setProfileData({ ...profileData, availability: false })
                }
              />
            </div>
          </div>
        </>
      )}

      {profileInfo === "employer" && (
        <>
          <div className="mt-4">
            <label className="block">Company Name</label>
            <input
              type="text"
              value={profileData.companyName || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, companyName: e.target.value })
              }
              name="companyName"
              className="w-full p-2 border dark:text-lightText rounded-lg"
            />
          </div>
          <div className="mt-4">
            <label className="block">Website</label>
            <input
              type="text"
              value={profileData.website || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, website: e.target.value })
              }
              name="website"
              className="w-full p-2 border dark:text-lightText rounded-lg"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileEdit;
