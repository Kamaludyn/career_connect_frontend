import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import ReactMarkdown from "react-markdown";
import { MdChevronLeft } from "react-icons/md";
import { toast } from "react-hot-toast";

const ResourceDetails = () => {
  const [resource, setResource] = useState({});
  const [loading, setLoading] = useState(true);

  // Extract the `id` parameter from the URL using `useParams`
  const { id } = useParams();

  const navigate = useNavigate();

// useEffect hook to fetch a selected resource data when the component mounts or when `id` changes
  useEffect(() => {
     // Function to fetch resource details from the API
    const fetchResource = async () => {
      setLoading(true);
      try {
        // Send a GET request to fetch resource details using the resource ID
        const response = await api.get(`/resources/${id}`);

       // Update state with the fetched resource data
       setResource(response.data);
      } catch (error) {
          // Show an error notification if the API request fails
        toast.error("An Error Occurred while fetching the resource material");
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    fetchResource();
  }, [id]);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {loading ? (
        <>
          <div className="h-8 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 rounded mt-2 animate-pulse"></div>
          <div className="mt-6 space-y-6">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-[60vh] w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            {resource?.title}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
            {resource?.description}
          </p>
          <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-300 overflow-auto break-words">
            <div className="whitespace-pre-wrap break-words">
              <ReactMarkdown>{String(resource?.body)}</ReactMarkdown>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 italic mt-8">
            Author:{" "}
            <span className="text-warning">
              {resource?.uploadedBy?.othername} {resource?.uploadedBy?.surname}
            </span>
          </p>
        </>
      )}
      <button
        className="flex items-center mt-8 text-center text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        <MdChevronLeft />
        Back
      </button>
    </div>
  );
};

export default ResourceDetails;
