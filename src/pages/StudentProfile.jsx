import { useNavigate, useLocation } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

const StudentProfile = () => {
  const location = useLocation();
  const { user } = location.state;
  const navigate = useNavigate();

  return (
    <div className="mx-auto p-4 pb-10 bg-white dark:bg-gray-800 rounded-lg shadow">
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
              {user.othername} {user.surname}
            </h1>
            <p className="text-md text-gray-700 dark:text-gray-300 mt-2">
              {user.email}
            </p>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-4">About</h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 mt-2">
          {user.bio}
        </p>
        <h2 className="text-xl font-semibold mt-4">Department:</h2>
        <p className="text-md mt-2 text-gray-700 dark:text-gray-300">
          {user.department}
        </p>
        {user.role === "student" && (
          <>
            <h2 className="text-xl font-semibold mt-4">Level:</h2>
            <p className="text-md mt-2 text-gray-700 dark:text-gray-300">
              {user.level}
            </p>
          </>
        )}

        <h2 className="text-xl font-semibold mt-4">Certifications:</h2>
        <p className="text-md mt-2 text-gray-700 dark:text-gray-300">
          {user.certifications}
        </p>
        <h2 className="text-xl font-semibold mt-4">Skills</h2>
        <p className="text-md mt-2 text-gray-700 dark:text-gray-300">
          {user.skills}
        </p>
      </div>
    </div>
  );
};

export default StudentProfile;
