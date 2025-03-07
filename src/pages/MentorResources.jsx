import { useState, useEffect } from "react";

const mockResources = [
  { id: 1, title: "React Basics", description: "A beginner's guide to React", price: "Free" },
  { id: 2, title: "Machine Learning 101", description: "Introduction to ML concepts", price: "$10" },
  { id: 3, title: "Backend Development", description: "Node.js and Express fundamentals", price: "$15" },
];

const MentorResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newResource, setNewResource] = useState({ title: "", description: "", price: "" });
  const [openForm, setOpenForm] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setResources(mockResources);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddResource = () => {
    if (newResource.title && newResource.description) {
      setResources((prev) => [
        ...prev,
        { id: prev.length + 1, ...newResource, price: newResource.price || "Free" },
      ]);
      setNewResource({ title: "", description: "", price: "" });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 dark:text-darkText">Resources</h2>
      <div className="relative mb-4 p-4 bg-white dark:bg-darkBg rounded-2xl">
        <h3 className={`${!openForm ?"text-lg font-medium mb-2" : "bg-secondary p-2 text-center rounded-2xl text-darkText cursor-pointer"} dark:text-darkText`} onClick={() => (setOpenForm(false), console.log("form"))}>Add New Resource</h3>
        <button className={`${openForm ? "hidden":"block absolute top-3 right-3 text-rose-500"}`} onClick={()=>setOpenForm(true)}>close</button>
        <div className={`${!openForm ?"h-full":"hidden"}`}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newResource.title}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newResource.description}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="price"
          placeholder="Price (optional)"
          value={newResource.price}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={handleAddResource}
          className="px-3 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Resource
        </button>
      </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        // <ul className="space-y-3">
        <ul className="mt-2 p-2 pb-4 md:p-4 space-y-3 bg-lightBg dark:bg-gray-800 rounded-2xl dark:text-darkText">
          {resources.map(({ id, title, description, price }) => (
            <>
            <li key={id} 
            // className="p-3 border rounded-md"
             className="flex flex-col p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md"
            >
              <p className="font-medium text-lg">{title}</p>
              <p className="text-sm text-gray-600">{description}</p>
              <p className="text-sm font-semibold text-green-600">Price: {price}</p>
            </li>
            <hr></hr>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentorResources;
