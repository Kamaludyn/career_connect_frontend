import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import PlaceholderCards from "../components/PlaceholderCards";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const { user } = useAuth();
  const { resources } = useData();

  // Array of predefined categories
  const categories = [
    "Interview Preparation",
    "Resume & Cover Letter Writing",
    "Career Growth Strategies",
    "Networking & Personal Branding",
    "Internship & Job Search Tips",
    "Time Management & Productivity",
    "Public Speaking & Communication Skills",
    "Freelancing & Side Hustles",
    "Leadership & Teamwork",
    "Technical Skills & Certifications",
    "Soft Skills Development",
    "Entrepreneurship & Startups",
    "Work-Life Balance & Mental Well-being",
    "Industry Insights & Trends",
    "Scholarships & Study Abroad Tips",
    "Others",
  ];

  const handleClick = (resource) => {
    //  Check if user is logged in before proceeding
    if (!user) {
      toast.error("Please login to get access");
      return;
    }

    // Navigate to the clicked resource detail page
    navigate(`/resource-details/${resource._id}`);
  };

  // Filter resources based on search query and selected category
  const filteredResources = resources?.filter(
    (resource) =>
      // Check if the resource title includes the search query (case-insensitive)
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      // If no category is selected, include resources from all categories
      // Otherwise, only include resources matching the selected category
      (category === "" || resource.category === category)
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl">
      <section className="text-center mb-6">
        <h1 className="text-3xl font-bold">Career Resources</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explore guides, articles, and templates to boost your career
        </p>
        <input
          type="text"
          placeholder="Search resources..."
          className="mt-4 p-2 w-full max-w-lg rounded-lg shadow dark:text-lightText"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-6 text-primary">
        <select
          name="category"
          className="p-2 rounded-lg"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </section>
      {filteredResources.length === 0 ? (
        <PlaceholderCards />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <div
              key={index}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <h3 className="text-lg font-semibold">{resource.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {resource.description}
              </p>
              <button
                className="mt-2 inline-block text-blue-600"
                onClick={handleClick}
              >
                Read More
              </button>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Resources;
