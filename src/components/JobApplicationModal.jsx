import { BsX } from "react-icons/bs";

const JobApplicationModal = ({ setRedirect, applicationLink }) => {
  return (
    <div className="fixed inset-0 bg-[#00000050] bg-opacity-50 flex items-center justify-center h-screen">
      <p className="relative bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-6 rounded">
        <BsX
          className="absolute top-[5%] right-[1%] font-semibold text-xl text-error cursor-pointer"
          onClick={() => setRedirect(false)}
        />
        <strong>Apply Here:</strong>{" "}
        <a
          href={
            applicationLink.includes("@")
              ? `mailto:${applicationLink}`
              : applicationLink.startsWith("http")
              ? applicationLink
              : `https://${applicationLink}`
          }
          className="text-blue-600 underline"
          target={applicationLink.includes("@") ? "_self" : "_blank"}
          rel="noopener noreferrer"
        >
          {applicationLink}
        </a>
      </p>
    </div>
  );
};

export default JobApplicationModal;
