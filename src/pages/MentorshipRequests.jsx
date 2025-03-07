import { useState, useEffect } from "react";

const mockRequests = [
  {
    id: 1,
    mentee: "Alice Johnson",
    message: "Looking for guidance in React.js",
    status: "pending",
  },
  {
    id: 2,
    mentee: "Bob Smith",
    message: "Need help with machine learning basics",
    status: "pending",
  },
  {
    id: 3,
    mentee: "Charlie Brown",
    message: "Want to improve backend skills",
    status: "accepted",
  },
];

const MentorshipRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAction = (id, status) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  return (
    <div className="p-4 dark:text-darkText">
      <h2 className="text-xl font-semibold mb-4">Mentorship Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-2 p-2 pb-4 md:p-4 space-y-3 bg-lightBg dark:bg-gray-800 rounded-2xl">
          {requests.map(({ id, mentee, message, status }) => (
            <>
              <li
                key={id}
                className="flex flex-col p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md"
              >
                <p className="font-medium">{mentee}</p>
                <p className="text-sm text-gray-600">{message}</p>
                <p
                  className={`text-sm ${
                    status === "accepted" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  Status: {status}
                </p>
                {status === "pending" && (
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleAction(id, "accepted")}
                      className="px-3 py-1 bg-green-500 text-white rounded-md"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(id, "rejected")}
                      className="px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
              <hr></hr>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentorshipRequests;
