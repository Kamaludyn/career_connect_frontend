import { useState } from 'react';
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";
// import { FaEdit, FaTrash } from "react-icons/fa";

// // const mockUsers = [
// //   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Job Seeker', status: 'Active' },
// //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Employer', status: 'Suspended' },
// //   { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Mentor', status: 'Active' },
// // ];

const Users = () => {
// //   const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(search.toLowerCase()) ||
//     user.email.toLowerCase().includes(search.toLowerCase())
//   );



// //   const columns = [
// //     { headerName: 'Name', field: 'name', sortable: true, filter: true },
// //     { headerName: 'Email', field: 'email', sortable: true, filter: true },
// //     { headerName: 'Role', field: 'role', sortable: true, filter: true },
// //     { headerName: 'Status', field: 'status', sortable: true, filter: true },
// //     { headerName: 'Actions', field: 'actions', cellRenderer: (params) => (
// //       <button className="p-2 bg-blue-500 text-white rounded">Edit</button>
// //     )},
// //   ];
//  // Template for rendering action icons (Edit and Delete)
//  const actionBodyTemplate = (rowData) => (
//     <div className="flex gap-3">
//       <FaEdit
//         className="text-lime-400 cursor-pointer"
//         // onClick={() => handleEdit(rowData)}a
//       />
//       <FaTrash
//         className="text-rose-600 cursor-pointer"
//         // onClick={() => handleDelete(rowData)}
//       />
//     </div>
//   );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
       <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />
   
      </div>
   );
 };

export default Users;
