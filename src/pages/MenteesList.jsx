import { useState, useEffect } from "react";
import { BsPersonCircle } from "react-icons/bs";

const mockMentees = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Frontend Developer",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Data Scientist",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "Backend Developer",
    image: "https://via.placeholder.com/50",
  },
];

const MenteesList = () => {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMentees(mockMentees);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredMentees = mentees.filter((mentee) =>
    mentee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 dark:text-darkText">Mentees List</h2>
      <input
        type="text"
        placeholder="Search Mentees..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full rounded-2xl"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-2 p-2 md:p-4 space-y-2 bg-lightBg dark:bg-gray-800 rounded-2xl">
          {filteredMentees.map((mentee) => (
            <>
            <li
              key={mentee.id}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md"
            >
              {/* <img
                src={mentee.image}
                alt={mentee.name}
                className="w-12 h-12 rounded-full mr-3"
              /> */}
              <BsPersonCircle className="h-12 w-12 mr-3 rounded-full text-lightText dark:text-darkText" />
              <div>
                <p className="font-medium dark:text-darkText">{mentee.name}</p>
                <p className="text-sm text-gray-600">{mentee.role}</p>
              </div>
            </li>
            <hr></hr>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenteesList;
