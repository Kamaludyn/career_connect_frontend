import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import api from "../services/api";
import PlaceholderCards from "../components/PlaceholderCards";
import MentorshipReqModal from "../components/MentorshipReqModal";

const MentorshipPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [mentorId, setMentorId] = useState(0);

  const { mentors } = useData();

  const navigate = useNavigate();

  const handleClick = (id) => {
    setMentorId(id); // Stores the selected mentor's ID in state

    // Sets the redirect state to `true` to navigate to another page or display details
    setRedirect(true);
  };

  // Filters Mentors Based on Search Query
  const filteredMentors = mentors?.filter((mentor) => {
    return (
      mentor.surname.toLowerCase().includes(searchQuery) ||
      mentor.othername.toLowerCase().includes(searchQuery) ||
      mentor.department.toLowerCase().includes(searchQuery) ||
      mentor.industry.toLowerCase().includes(searchQuery)
    );
  });

  return (
    <>
      <section className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl">
        <section className="text-center mb-6">
          <h1 className="text-3xl font-bold">Find a Mentor</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Connect with industry experts to guide your career journey
          </p>
          <input
            type="text"
            placeholder="Search by name, department, or indusutry..."
            className="mt-4 p-2 w-full max-w-lg rounded-lg shadow dark:text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </section>
        {filteredMentors.length === 0 ? (
          <PlaceholderCards />
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors?.map((mentor) => (
              <div
                key={mentor._id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <h3
                  className="w-fit text-lg font-semibold hover:text-primary active:text-primary hover:underline cursor-pointer"
                  onClick={() =>
                    navigate(`/mentor-profile/${mentor._id}`, {
                      state: { mentor },
                    })
                  }
                >
                  {mentor.othername} {mentor.surname}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {mentor.jobTitle} - {mentor.companyName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Industry: {mentor.industry}
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  onClick={() => handleClick(mentor._id)}
                >
                  Request Mentorship
                </button>
              </div>
            ))}
          </section>
        )}
      </section>
      {redirect && (
        <MentorshipReqModal mentorId={mentorId} setRedirect={setRedirect} />
      )}
    </>
  );
};

export default MentorshipPage;
