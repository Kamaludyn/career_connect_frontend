import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import api from "../services/api";

const Students = () => {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Hook to navigate programmatically to different routes
  const navigate = useNavigate();

  // useEffect to fetch applicants when the component mounts
  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        // Fetch all users from the API
        const response = await api.get("/users");

        // Filter the users to include only students and unavailable mentors
        const applicants = response.data.filter(
          (applicant) =>
            applicant.role === "student" ||
            (applicant.role === "mentor" && applicant.availability === false)
        );
        // Update state with the filtered applicants
        setApplicants(applicants);
      } catch (error) {
        // Handle network errors
        if (error?.code === "ERR_NETWORK") {
          toast.error(error?.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants(); // Call the fetchApplicants function
  }, []);

  // Filter the applicants based on the search term
  const filteredApplicants = applicants?.filter(
    (applicant) =>
      applicant.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.othername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skills
        .join(" ") // Convert array to a string
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div id="recruit" className="">
      <h3 className="text-lg ml-2 font-semibold dark:text-darkText">
        Recruit Students and Mentors for your company{" "}
      </h3>
      <input
        type="text"
        placeholder="Search by name or skill..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border w-full mt-2 rounded-2xl"
      />
      {loading ? (
        <ul className="w-full mt-2 p-2 md:p-4 bg-lightBg dark:bg-gray-800 rounded-2xl ">
          {[...Array(5)].map((_, index) => (
            <li
              key={index}
              className="flex justify-between p-2 mt-2 rounded-md animate-pulse bg-gray-200 dark:bg-gray-700"
            >
              <div className="w-full h-12 flex gap-2 dark:text-darkText">
                <div className="h-full w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="self-center h-6 w-[25%] bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="self-center h-6 w-[25%] bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-2 p-2 md:p-4 bg-lightBg dark:bg-gray-800 rounded-2xl">
          {filteredApplicants.map((applicant) => (
            <React.Fragment key={applicant._id}>
              <li className="flex items-center p-2 pb-0 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md">
                <BsPersonCircle className="h-12 w-12 mr-3 mb-1 rounded-full text-lightText dark:text-darkText" />

                <div>
                  <div>
                    <p className="font-medium dark:text-white">
                      {applicant.othername} {applicant.surname}
                    </p>
                    <p className="text-sm text-gray-600">{applicant.skills}</p>
                  </div>
                  <button
                    className="text-blue-500 md:mr-3 hover:underline"
                    onClick={() =>
                      navigate(`/student-profile/${applicant._id}`, {
                        state: { user: applicant },
                      })
                    }
                  >
                    View Profile
                  </button>
                </div>
              </li>
              <hr className="mb-3"></hr>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Students;
