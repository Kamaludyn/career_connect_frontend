import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import api from "../services/api";
import MentorshipReqModal from "../components/MentorshipReqModal";
import { BsPersonCircle, BsChevronLeft } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const MentorProfile = () => {
  const [mentorData, setMentorData] = useState({});
  const [redirect, setRedirect] = useState(false);

  const { user } = useAuth();

  const location = useLocation();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // Check if there is any state passed through the navigation (location.state).
    if (!location.state) {
      // If no state is passed, fetch the mentor data manually using the user ID from the URL.
      const fetchJob = async () => {
        try {
          // Make an API request to get mentor data by ID.
          const response = await api.get(`/users/${id}`);

          // Store the fetched mentor data in state.
          setMentorData(response.data);
        } catch (error) {
          // Handle any error that might occur during the fetch.
          console.error("Error fetching mentor details");
        }
      };

      fetchJob();
    } else {
      // If state is passed from navigation, use that to avoid refetching from the server.
      const { mentor } = location.state;

      // Set the mentor data directly from navigation state.
      setMentorData(mentor);
    }
  }, []);

  const handleClick = () => {
    //  Check if user is logged in before proceeding
    if (!user) {
      toast.error("Please login to request mentorship");
      return;
    }
    setRedirect(true);
  };

  return (
    <>
      <div className="mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p
          className="w-fit py-2 px-4 border rounded-lg hover:bg-transparent bg-gray-300 dark:text-black dark:hover:bg-gray-700 hover:text-primary cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <BsChevronLeft />
        </p>
        <div className=" md:ml-[10%]">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-5">
            <BsPersonCircle className="text-9xl rounded-full w-24 h-24 dark:text-gray-300" />

            <div>
              <h1 className="text-2xl font-bold dark:text-gray-300">
                {mentorData?.othername} {mentorData?.surname}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {mentorData?.jobTitle} at {mentorData?.companyName}
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mt-4">About</h2>
          <p className="text-md text-gray-700 dark:text-gray-300 mt-2">
            {mentorData?.bio}
          </p>

          <h2 className="text-xl font-semibold mt-4">Qualification:</h2>
          <p className="text-xl mt-2 text-gray-700 dark:text-gray-300">
            {mentorData?.department} graduate
          </p>
          <h2 className="text-xl font-semibold mt-4">Skills</h2>
          <ul className="list-disc ml-5 mt-2">
            {mentorData?.skills?.map((skill, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {skill}
              </li>
            ))}
          </ul>
          {location?.state ? (
            <button
              onClick={handleClick}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Request Mentorship
            </button>
          ) : (
            <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Send Message
            </button>
          )}
        </div>
      </div>
      {redirect && (
        <MentorshipReqModal
          mentorId={mentorData?._id}
          setRedirect={setRedirect}
        />
      )}
    </>
  );
};

export default MentorProfile;
