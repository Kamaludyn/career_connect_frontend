import { useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";

const AddResourcesForm = () => {
  const [openForm, setOpenForm] = useState(true);

  // Array of predefined categories for the resource selection dropdown
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

  // Handles form submission for creating a new resource.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const resourceData = e.target; // Access the form element

    // Extracting form values and structuring them into an object
    const formData = {
      title: resourceData.title.value,
      description: resourceData.description.value,
      body: resourceData.body.value,
      price: resourceData.price.value,
      category: resourceData.category.value,
    };

    try {
      // Send a POST request to the `/resources` API endpoint with form data
      const response = await api.post("/resources", formData);
      resourceData.reset();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data.message);
    } finally {
      setOpenForm(false);
    }
  };

  return (
    <section>
      <div className="relative mb-4 p-4 bg-white dark:bg-darkBg rounded-2xl">
        <h3
          className={`${
            !openForm
              ? "text-lg font-medium mb-2"
              : "bg-secondary p-2 text-center rounded-2xl text-darkText cursor-pointer"
          } dark:text-darkText`}
          onClick={() => (setOpenForm(false), console.log("form"))}
        >
          Add New Resource
        </h3>
        <button
          className={`${
            openForm ? "hidden" : "block absolute top-3 right-3 text-rose-500"
          }`}
          onClick={() => setOpenForm(true)}
        >
          close
        </button>
        <form
          onSubmit={handleSubmit}
          className={`${!openForm ? "h-full" : "hidden"}`}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border p-2 mb-2 w-full"
          />
          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 mb-2 w-full"
            maxLength={500}
          />
          <textarea
            name="body"
            placeholder="Body"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="price"
            placeholder="Price (optional)"
            className="border p-2 mb-2 w-full"
          />
          <select name="category" className="border p-2 mb-2 w-full" required>
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Resource
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddResourcesForm;
