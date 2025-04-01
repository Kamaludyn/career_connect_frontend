import { useState } from "react";
import { useData } from "../context/DataContext";
import ClipLoader from "react-spinners/ClipLoader";
import { BsX } from "react-icons/bs";

const MentorshipReqModal = ({ mentorId, setRedirect }) => {
  const [loading, setLoading] = useState(false);
  const { requestMentorship } = useData();

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Extracts the message input value from the event object
    const reqMessage = e.target.message.value;

    // Calls the `requestMentorship` function with the extracted message and `mentorId`
    const success = await requestMentorship(reqMessage, mentorId);

    // If the mentorship request was successful, update the state to prevent redirection
    if (success) setRedirect(false);

    setLoading(false);
  };
  return (
    <section className="fixed inset-0 bg-[#00000050] bg-opacity-50 flex items-center justify-center h-screen">
      <form
        onSubmit={handleRequest}
        className="relative flex flex-col items-center gap-2 md:w-[40%] bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-6 rounded"
      >
        <BsX
          className="absolute top-[5%] right-[1%] font-semibold text-xl text-error cursor-pointer"
          onClick={() => setRedirect(false)}
        />
        <strong>On what do you need guidance:</strong>{" "}
        <textarea
          name="message"
          id="message"
          className="w-full dark:text-lightText p-2 border border-gray-300 rounded"
          placeholder="Write a short request note"
          required
        ></textarea>
        <button
          type="submit"
          className={`w-1/2 mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg  ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? <ClipLoader color="#ffffff" size={18} /> : "Send Request"}
        </button>
      </form>
    </section>
  );
};

export default MentorshipReqModal;
