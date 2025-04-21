import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import ClipLoader from "react-spinners/ClipLoader";

const SearchPage = () => {
  const [searchResultsPage, setsearchResultsPage] = useState(1);

  const {
    searchQuery,
    searchResults,
    setSearchResults,
    searchSite,
    searching,
    setSearching,
  } = useData();

  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle the site-wide search
    const handleSearch = async () => {
      // If there's no search query, don't perform the search
      if (!searchQuery) return;

      try {
        // Call the search API with the current query and page number
        const response = await searchSite(searchQuery, searchResultsPage);

        // Update the state with the returned search results
        setSearchResults(response);
      } catch (error) {
        // Show an error toast if the search request fails
        toast.error("Search Error");
      } finally {
        // Set the searching state to false after the search completes
        setSearching(false);
      }
    };

    // Trigger the search when searchQuery or page number changes
    handleSearch();
  }, [searchResultsPage]);

  return (
    <section className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl">
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold">Search Results</h1>
        {searching ? (
          <ClipLoader size={30} className="mt-[5%]" />
        ) : !Object.values(searchResults)?.some((arr) => arr.length > 0) ? (
          <p className="mt-[25%] text-gray-500 dark:text-gray-400">
            No Search Results
          </p>
        ) : (
          <div>
            {searchResults.jobs.length > 0 && (
              <>
                <h3>Jobs</h3>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
                  {searchResults?.jobs?.map((job) => (
                    <div
                      key={job._id}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow "
                    >
                      <h3
                        className="text-lg font-semibold cursor-pointer hover:text-primary active:text-primary hover:underline"
                        onClick={() => navigate(`/job-details/${job._id}`)}
                      >
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {job.company} -{" "}
                        {job.locationDetails
                          ? job.locationDetails
                          : job.location}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {job.type}: {job.currency}
                        {job.minSalary}
                      </p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {searchResults.mentors.length > 0 && (
              <>
                <h3>Mentors</h3>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
                  {searchResults?.mentors?.map((mentor) => (
                    <div
                      key={mentor._id}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                    >
                      <h3
                        className="w-fit text-lg mx-auto font-semibold hover:text-primary active:text-primary hover:underline cursor-pointer"
                        onClick={() =>
                          navigate(`/mentor-profile/${mentor._id}`)
                        }
                      >
                        {mentor.othername} {mentor.surname}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {mentor.jobTitle} - {mentor.companyName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Industry: {mentor.industry}
                      </p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {searchResults.resources.length > 0 && (
              <>
                <h3>Resources</h3>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
                  {searchResults?.resources?.map((resource) => (
                    <div
                      key={resource._id}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                    >
                      <h3 className="text-lg font-semibold">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {resource.description}
                      </p>
                      <button
                        className="mt-2 inline-block text-blue-600"
                        onClick={() =>
                          navigate(`/resource-details/${resource._id}`)
                        }
                      >
                        Read More
                      </button>
                    </div>
                  ))}
                </section>
              </>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        {searchResultsPage > 1 && (
          <div className="flex justify-between w-full">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() =>
                setsearchResultsPage((prev) => Math.max(prev - 1, 1))
              }
            >
              Prev
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setsearchResultsPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </section>
  );
};

export default SearchPage;
