import ReactMarkdown from "react-markdown";
import { MdChevronLeft } from "react-icons/md";

const MyResource = ({ selectedResource, setOpenResource }) => {
  return (
    <div className="p-6 mt-2 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <button
        className="flex items-center my-4 text-center text-blue-600 hover:underline"
        onClick={() => setOpenResource(false)}
      >
        <MdChevronLeft />
        Back
      </button>
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
        {selectedResource.title}
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
        {selectedResource.description}
      </p>
      <div className="mt-6 space-y-6 text-gray-700 dark:text-gray-300 overflow-auto break-words">
        <div className="whitespace-pre-wrap break-words">
          <ReactMarkdown>{String(selectedResource.body)}</ReactMarkdown>
        </div>
      </div>
      <button
        className="flex items-center mt-8 text-center text-blue-600 hover:underline"
        onClick={() => setOpenResource(false)}
      >
        <MdChevronLeft />
        Back
      </button>
    </div>
  );
};

export default MyResource;
