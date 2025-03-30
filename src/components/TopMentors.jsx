import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import RecomContentPlaceholder from "./RecomContentPlaceholder";

const TopMentors = () => {
  const { mentors } = useData();
  const navigate = useNavigate();

  // Extract only four mentors for display
  const topMentors = mentors.slice(0, 4);
  return (
    <section className="mt-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold">Top Mentors</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Connect with industry experts
      </p>
      {topMentors.length === 0 ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <RecomContentPlaceholder key={index} />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {topMentors.map((mentor) => (
            <div
              key={mentor._id}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <h4 className="text-md font-medium">
                {mentor.othername} {mentor.surname}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {mentor.jobTitle} - {mentor.companyName}
              </p>
              <button
                className="text-blue-500 dark:text-blue-400 mt-2 block hover:underline"
                onClick={() =>
                  navigate(`/mentor-profile/${mentor._id}`, {
                    state: { mentor },
                  })
                }
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopMentors;
