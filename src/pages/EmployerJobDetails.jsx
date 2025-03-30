import { useAuth } from "../context/AuthContext";

export default function EmployerJobDetails({ myJob, isOpen, setIsOpen }) {
  return (
    <div
      className={`w-full flex flex-col items-center mx-auto p-6 bg-white dark:bg-darkBg dark:text-white rounded-lg shadow-md ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="self-start mb-3">
        <p
          className="w-fit py-2 px-4 border rounded-lg hover:bg-transparent bg-gray-300 dark:hover:bg-gray-700 hover:text-primary cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          Back
        </p>
      </div>
      <h2 className="text-3xl font-bold mb-4">{myJob?.title}</h2>
      <p className="text-lg text-gray-600">{myJob?.company}</p>
      <p className="mt-2">{myJob?.description}</p>

      <div className="mt-4">
        <p>
          <strong>Location:</strong> {myJob?.location}
        </p>
        {myJob?.location !== "Remote" && (
          <p>
            <strong>Address:</strong> {myJob?.locationDetails}
          </p>
        )}
        <p>
          <strong>Type:</strong> {myJob?.type}
        </p>
        <p>
          <strong>Experience Level:</strong> {myJob?.experienceLevel}
        </p>
      </div>

      <div className="mt-4">
        <p>
          <strong>Salary:</strong> {myJob?.currency} {myJob?.minSalary} -{" "}
          {myJob?.maxSalary}
        </p>
      </div>

      <div className="mt-4">
        <p>
          <strong>Application Method:</strong> {myJob?.applicationMethod}
        </p>
        {myJob?.applicationMethod !== "careerconnect" &&
          myJob?.applicationLink && (
            <p>
              <strong>Apply Here:</strong>{" "}
              <a
                href={myJob?.applicationLink}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {myJob?.applicationLink}
              </a>
            </p>
          )}
      </div>
      <div>
        <strong>Applications:</strong>{" "}
        {myJob?.applicants.map((applicant) => (
          <p className="italic text-primary hover:underline cursor-pointer">
            {applicant.applicant.othername} {applicant.applicant.surname}
          </p>
        ))}
      </div>
    </div>
  );
}
