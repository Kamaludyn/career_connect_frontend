import {useState} from "react"
import { useNavigate, useLocation } from "react-router-dom";
import MentorshipReqModal from "../components/MentorshipReqModal";
import { BsPersonCircle } from "react-icons/bs";

const MentorProfile = () => {
  const [redirect, setRedirect] = useState(false)
  const location = useLocation();
  const { mentor } = location.state;
  
  const navigate = useNavigate();
  
  return (
    <>
    <div className="mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <p
        className="w-fit py-2 px-4 border rounded-lg hover:bg-transparent bg-gray-300 dark:text-black dark:hover:bg-gray-700 hover:text-primary cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Back
      </p>
      <div className=" md:ml-[10%]">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-5">
          <BsPersonCircle className="text-9xl rounded-full w-24 h-24 dark:text-gray-300" />

          <div>
            <h1 className="text-2xl font-bold dark:text-gray-300">
              {mentor.othername} {mentor.surname}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {mentor.jobTitle} at {mentor.companyName}
            </p>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-4">About</h2>
        <p className="text-md text-gray-700 dark:text-gray-300 mt-2">
          {mentor.bio}
        </p>

        <h2 className="text-xl font-semibold mt-4">Qualification:</h2>
        <p className="text-xl mt-2 text-gray-700 dark:text-gray-300">
          {mentor.department} graduate
        </p>
        <h2 className="text-xl font-semibold mt-4">Skills</h2>
        <ul className="list-disc ml-5 mt-2">
          {mentor.skills.map((skill, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              {skill}
            </li>
          ))}
        </ul>
        <button
        onClick={() => setRedirect(true)}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Request Mentorship
        </button>
      </div>
    </div>
    {
      redirect && 
      <MentorshipReqModal mentorId={mentor._id} setRedirect={setRedirect}/>
    }
    </>
  );
};

export default MentorProfile;
