import { useState, useEffect } from "react";
import AddResourcesForm from "../components/AddResourcesForm";
import MyResource from "../components/MyResource";
import api from "../services/api";

const MentorResources = () => {
  const [myResources, setMyResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState([]);
  const [openResource, setOpenResource] = useState(false);
  const [openForm, setOpenForm] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Define an async function to fetch the user's resources
    const fetchMyResources = async () => {
      setLoading(true);

      try {
        // Make an HTTP GET request to fetch the user's resources
        const response = await api.get("/resources/my-resources");

          // Update state with the retrieved resources
        setMyResources(response.data);
      } catch (error) {
         // Handle specific error cases 
        if (error?.response?.status === 401) {
          toast.error(error?.response?.data?.message);
        } else if (error?.response?.status === 403) {
          toast.error(error?.response?.data?.message);
        } else {
          // Catch-all other errors
          toast.error("Fetching Resources Failed");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMyResources();
  }, []);

  return (
    <>
      {!openResource ? (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 dark:text-darkText">
            Resources
          </h2>
          <AddResourcesForm openForm={openForm} setOpenForm={setOpenForm} />
          {loading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <li
                  key={index}
                  className="flex flex-col p-2 cursor-pointer rounded-md animate-pulse"
                >
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-md w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-md w-1/3"></div>
                </li>
              ))}
            </>
          ) : (
            <ul className="mt-2 p-2 pb-4 md:p-4 space-y-3 bg-lightBg dark:bg-gray-800 rounded-2xl dark:text-darkText">
              {myResources?.map((resource) => (
                <>
                  <li
                    key={resource._id}
                    onClick={() => {
                      setSelectedResource(resource);
                      setOpenResource(true);
                    }}
                    className="flex flex-col p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md"
                  >
                    <p className="font-semibold text-lg">{resource.title}</p>
                    <p className="font-medium text-sm text-gray-600 truncate overflow-hidden">
                      {resource.description}
                    </p>
                    <p className="text-sm font-semibold text-warning">
                      Access Count: {resource.accessCount}
                    </p>
                    <p className="text-sm font-semibold text-success">
                      Price: {!resource.price ? "Free" : resource.price}
                    </p>
                  </li>
                  <hr></hr>
                </>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <MyResource
          selectedResource={selectedResource}
          setOpenResource={setOpenResource}
        />
      )}
    </>
  );
};

export default MentorResources;
