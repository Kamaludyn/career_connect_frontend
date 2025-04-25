import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { BsPersonCircle } from "react-icons/bs";

const MenteesList = () => {
  const [mentees, setMentees] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // UseEffect to fetch Accepted Mentees
  useEffect(() => {
    const fetchAcceptedMentees = async () => {
      setLoading(true);
      try {
        const response = await api.get("/mentorships");
        // Filtering the response to get mentees that have been accepted
        const myMentees = response.data
          .filter((res) => res.status === "accepted")
          .map((res) => res.mentee);

        setMentees(myMentees);
      } catch (error) {
        console.error("Failed to Fetch My Mentees");
      } finally {
        setLoading(false);
      }
    };
    fetchAcceptedMentees();
  }, []);

  // Filter the mentees based on the search query
  const filteredMentees = mentees?.filter((mentee) => {
    return (
      mentee.surname.toLowerCase().includes(search.toLowerCase()) ||
      mentee.othername.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 dark:text-darkText">
        Mentees List
      </h2>
      <input
        type="text"
        placeholder="Search Mentees..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full rounded-2xl"
      />
      {loading ? (
        <ul className="w-full p-4 bg-lightBg dark:bg-gray-800 rounded-2xl ">
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
      ) : filteredMentees?.length === 0 ? (
        <p className="p-4 mt-2 md:p-4 dark:text-white bg-lightBg dark:bg-gray-800 rounded-2xl">
          You don't have mentees yet, you need to accept mentorship request to
          see them here
        </p>
      ) : (
        <ul className="mt-2 p-2 md:p-4 space-y-2 bg-lightBg dark:bg-gray-800 rounded-2xl">
          {filteredMentees?.map((mentee) => (
            <li
              key={mentee?._id}
              className="flex items-center p-2 pb-0 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md"
            >
              <BsPersonCircle className="h-12 w-12 mr-3 rounded-full text-lightText dark:text-darkText" />
              <div>
                <p
                  className="font-medium dark:text-darkText hover:underline"
                  onClick={() =>
                    navigate(`/student-profile/${mentee?._id}`, {
                      state: { user: mentee },
                    })
                  }
                >
                  {mentee?.othername} {mentee?.surname}
                </p>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => navigate(`/messages/${mentee?._id}`)}
                >
                  Send Message
                </button>
              </div>
              <hr className="mt-2"></hr>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenteesList;
