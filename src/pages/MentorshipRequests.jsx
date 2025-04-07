import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-hot-toast";

const MentorshipRequests = () => {
  const location = useLocation();

  const [requests, setRequests] = useState([]);
  const [highlightId, setHighlightId] = useState(
    location.state?.highlightId || null
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch mentorship requests from the API
    const fetchRequest = async () => {
      setLoading(true);
      try {
        // HTTP GET request to fetch all mentorship requests
        const response = await api.get("/mentorships");

        // Update state with the fetched requests
        setRequests(response.data);
      } catch (error) {
        // Log a silent error message if the request fails
        console.error("Failed to Fetch Requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, []);

  useEffect(() => {
    if (highlightId) {
      const timer = setTimeout(() => {
        setHighlightId(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [highlightId]);

  // Function to accept a mentorship request
  const acceptRequest = async (requestId) => {
    // Show a confirmation dialog before proceeding
    const confirmRequest = confirm(
      "Are you sure you want to accept this request?"
    );

    // If the user cancels the action, exit the function
    if (!confirmRequest) return;

    try {
      // Make PUT request to accept the mentorship request
      const response = await api.put(`/mentorships/${requestId}/accept`);

      // Show a success message upon successful acceptance
      toast.success(response.data.message);

      // Update the local state to reflect the accepted request
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: "accepted" }
            : request
        )
      );
    } catch (error) {
      // Handle errors based on response status
      if (error?.response?.status === 404) {
        toast.error(error?.response?.data.message);
      } else if (error?.response?.status === 403) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error("Error: Cannot Accept Request");
      }
    }
  };

  // Function to reject a mentorship request
  const rejectRequest = async (requestId) => {
    // Show a confirmation dialog before proceeding
    const confirmRequest = confirm(
      "Are you sure you want to reject this request?"
    );

    // If the user cancels the action, exit the function
    if (!confirmRequest) return;

    try {
      // An HTTP PUT request to reject the mentorship request
      const response = await api.put(`/mentorships/${requestId}/reject`);

      // Show a success message upon successful rejection
      toast.success(response.data.message);

      // Update the local state to reflect the rejected request
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: "rejected" }
            : request
        )
      );
    } catch (error) {
      // Handle errors based on response status
      if (error?.response?.status === 404) {
        // Not Found
        toast.error(error?.response?.data.message);
      } else if (error?.response?.status === 403) {
        // Forbidden or Unauthorized
        toast.error(error?.response?.data.message);
      } else {
        toast.error("Error: Cannot Accept Request");
      }
    }
  };

  return (
    <div className="p-4 dark:text-darkText">
      <h2 className="text-xl font-semibold mb-4">Mentorship Requests</h2>
      {loading ? (
        <ul className="w-full p-4 bg-lightBg dark:bg-gray-800 rounded-2xl ">
          {[...Array(5)].map((_, index) => (
            <li
              key={index}
              className="flex justify-between p-2 mt-2 rounded-md animate-pulse bg-gray-200 dark:bg-gray-700"
            >
              <div className="w-full space-y-2 dark:text-darkText">
                <div className="h-6 w-[25%] bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-6 w-[65%] bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-6 w-[15%] bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </li>
          ))}
        </ul>
      ) : requests?.length === 0 ? (
        <p className="p-4 mt-2 md:p-4 dark:text-white bg-lightBg dark:bg-gray-800 rounded-2xl">
          No request available yet
        </p>
      ) : (
        <ul className="mt-2 p-2 pb-4 md:p-4 space-y-3 bg-lightBg dark:bg-gray-800 rounded-2xl">
          {requests?.map((req) => (
            <li
              key={req._id}
              className={`${
                req.mentee._id === highlightId
                  ? "bg-blue-300 animate-pulse"
                  : "bg-transparent"
              } flex flex-col p-2 pb-0 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md`}
            >
              <p
                className="font-medium hover:underline"
                onClick={() =>
                  navigate(`/student-profile/${req.mentee._id}`, {
                    state: { user: req.mentee },
                  })
                }
              >
                {req.mentee.othername} {req.mentee.surname}
              </p>
              <p className="text-sm text-gray-600">{req.message}</p>
              <p
                className={`text-sm ${
                  req.status === "accepted"
                    ? "text-success"
                    : req.status === "rejected"
                    ? "text-error"
                    : "text-warning"
                }`}
              >
                Status: {req.status}
              </p>
              {req.status === "pending" && (
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => acceptRequest(req._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => rejectRequest(req._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                  >
                    Reject
                  </button>
                </div>
              )}
              <hr className="mt-2"></hr>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentorshipRequests;
